
#################################################
### THIS FILE WAS AUTOGENERATED! DO NOT EDIT! ###
#################################################
# file to edit: dev_nb/AudioCommon.ipynb

from pathlib import Path
from IPython.core.debugger import set_trace
import mimetypes
import torch
from torchaudio import load as load_audio
from torchaudio.transforms import MelSpectrogram, PadTrim
from fastai.vision import Image, open_image, image2np
import PIL
import numpy as np

AUDIO_EXTENSIONS = tuple(str.lower(k) for k,v in mimetypes.types_map.items()
                         if v.startswith('audio/'))

class SPEC2DB(object):
    """Turns a spectrogram from the power/amplitude scale to the decibel scale.

    Args:
        stype (str): scale of input spectrogram ("power" or "magnitude").  The
            power being the elementwise square of the magnitude. default: "power"
        top_db (float, optional): minimum negative cut-off in decibels.  A reasonable number
            is -80.
    """
    def __init__(self, stype="power", top_db=None):
        self.stype = stype
        self.top_db = -top_db if top_db > 0 else top_db
        self.multiplier = 10. if stype == "power" else 20.

    def __call__(self, spec):
        spec_db = self.multiplier * torch.log10(spec / spec.max())  # power -> dB
        if self.top_db is not None:
            spec_db = torch.max(spec_db, spec_db.new([self.top_db]))
        return spec_db

class AudioData:
    '''Holds basic information from audio signal'''

    def __init__(self, sig, sr=16000, spectro=None):
        self.sig = sig.reshape(-1) # We want single dimension data
        self.sr = sr
        self.spectro = spectro
        self.use_spectro = spectro is not None

    @property
    def shape(self):
        return self.spectro.shape if self.spectro is not None else self.sig.shape


    @classmethod
    def load(cls, fileName, use_spectro=True, cache_spectro=True, to_db_scale=True, n_fft=1024,
                ws=None, hop=72, f_min=0.0, f_max=80, pad=0, n_mels=224, max_to_pad=160000*3, **kwargs):
        p = Path(fileName)

        if p.exists() & str(p).lower().endswith(AUDIO_EXTENSIONS):
            signal, samplerate = load_audio(str(fileName), **kwargs)
            signal = PadTrim(max_len=max_to_pad)(signal).squeeze()
            mel = None
            if use_spectro:
                image_path = None
                if cache_spectro:
                    s = '_'.join([str(x) for x in (to_db_scale, n_fft, ws, hop, f_min, f_max, pad, n_mels, max_to_pad)])
                    image_path = p.parent/(f"{p.stem}_{s}.jpg")
                    if image_path.exists():
                        mel = open_image(image_path, convert_mode='L').data
                        return AudioData(signal, samplerate, mel)

                mel = MelSpectrogram(sr=samplerate, n_mels=n_mels, n_fft=n_fft, ws=ws, hop=hop,
                                    f_min=f_min, f_max=f_max, pad=pad)(signal.reshape(1, -1))
                mel = mel.permute(0, 2, 1) # swap dimension...
                if to_db_scale: mel = SPEC2DB(stype='magnitude', top_db=f_max)(mel)
                if cache_spectro:
                      x = image2np(mel).astype(np.uint8)
                      PIL.Image.fromarray(x).save(image_path)
                      mel = open_image(image_path, convert_mode='L').data
            return AudioData(signal, samplerate, mel)
        raise Exception(f"Error while processing {fileName}: file not found or does not have valid extension: {AUDIO_EXTENSIONS}")