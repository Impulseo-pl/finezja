# -*- coding: utf-8 -*-
"""Zdjęcia z finezja.org -> img/<nazwa>-<szer>.webp"""
import os
from PIL import Image, ImageOps, ImageEnhance
R='raw'; OUT='../img'
M = {  # nowa nazwa: plik źródłowy
 'hero':'sala-weselna-bankietowa.webp','sala-kwiaty':'wesele-sale.com_.webp','stol-mlodych':'sala-weselna.webp',
 'sala-stoly':'restauracja-turek.webp','scena-dj':'turek-organizacja-wesel.webp','sala-dluga':'menu-weselne.webp',
 'sala-okna':'imprezy-okolicznosciowe-turek.webp','sala-zyrandole':'restauracja-weselna.webp','sala-pion':'lokal-na-wesele-konin.webp',
 'nakrycie':'wesela-sala.webp','stol-gosci':'sala-slubna-stol-gosci.webp','sala-okragle':'dom-przyjec-kalisz.webp',
 'sala-wieczor':'wesela-kalisz.webp','bal-sala':'20241123_180045.webp','bal-parkiet':'20241123_180215.webp','bal-scianka':'20241123_180227.webp',
 'budynek-wieczor':'sala-na-wesele-turek.webp','budynek-dzien':'sala-na-wesele-kalisz.webp','budynek-front':'Finezja-sala-na-wesele.webp',
 'budynek-plac':'Sala-na-wesele-Finezja.webp','budynek-ogrod':'finezja-sala-weselna.webp','wejscie':'oswietlenie-sali-weselnej-zew.webp',
 'love':'turek-wesele.webp','dek-mlodzi':'konin-dekoracje.webp','dek-kwiaty':'dekoracje-stolow-i-wnetrza-sali-weselnej-mlodzi.webp',
 'dek-oltarz':'Dekoracje-restauracji.webp','dek-roze':'przyjecia-weselne-mlodzi_1.webp','dek-luk':'sala-bankietowa-Turek.webp',
 'dek-milosc':'sala-weselna-1.webp','dek-balony':'sala-weselna-turek.webp','chrzest-neon':'20241118_110425.webp','chrzest-pion':'20241118_105740.webp',
 'chrzest-balony':'20241118_105526.webp','urodziny-50':'20241109_161812.webp','urodziny-scianka':'20241130_145400.webp','urodziny-pion':'20241130_145315.webp',
 'osiemnastka':'konin-osiemnastka.webp','scianka-mis':'dj-na-wesele-turek-scianka.webp','dek-stol':'przyjecia-weselne.webp',
 'slodki-babeczki':'IMG_20230501_123110_Easy-Resize.com_.webp','kawa':'przyjecia-weselne-slo.webp','slodki-stol':'przyjecia-weselne-turek-slodki.webp',
 'slodki-regal':'przyjecie-weselne-turek-slodki_Easy-Resize.com_.webp','slodki-okno':'slodki-stol-konin.webp',
}
os.makedirs(OUT,exist_ok=True)
for n,src in M.items():
    im=ImageOps.exif_transpose(Image.open(os.path.join(R,src))).convert('RGB')
    for w in (640,1100,1600):
        if w>im.width and w!=640: continue
        x=im if im.width<=w else im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
        x.save(f'{OUT}/{n}-{min(w,im.width)}.webp','WEBP',quality=80,method=6)
# og + kpo
im=Image.open(os.path.join(R,M['hero'])).convert('RGB'); w,h=im.size
im.crop((0,(h-int(w/1.905))//2,w,(h-int(w/1.905))//2+int(w/1.905))).resize((1200,630),Image.LANCZOS).save(f'{OUT}/og.jpg',quality=82)
k=Image.open(os.path.join(R,'kpo.jpg')).convert('RGB'); k.thumbnail((900,200)); k.save(f'{OUT}/kpo.webp','WEBP',quality=85)
print(len(os.listdir(OUT)))
