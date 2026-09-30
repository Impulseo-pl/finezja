# Finezja — demo (sala weselna i bankietowa, Kaczki Średnie / Turek)

Lead z kampanii. Obecna strona: https://www.finezja.org/ · Demo: https://impulseo-pl.github.io/finezja/ (sprawdzamy **zawsze z `?team=1`**).
Kontakt klienta: 665 188 619, 601 637 397, biuro@finezja.org, Kaczki Średnie 10c, 62-700 Turek, NIP 7391718282.

Strony generuje `_src/build.py` (`python _src/build.py`), zdjęcia `_src/obrazy.py` (źródła w `_src/raw`, nie commitujemy).
Podgląd lokalny: z `C:\Users\kluch` → `python -m http.server 8124` → http://127.0.0.1:8124/finezja/

| Strona | Co jest |
|---|---|
| `/` | hero z salą, fakty, sala/kuchnia, 6 okazji, ciemna sekcja Bal Andrzejkowy (odliczanie dni), dojazd i noclegi, opinie Google, 6 kroków, mapa |
| `/wesele/` | tabela „w liczbach”, **kalkulator menu 330–380 zł/os. × goście**, przebieg kolacji, kroki, partnerzy z telefonami, noclegi, FAQ |
| `/przyjecia/` | osiemnastka (motywy, forma podania, FAQ), urodziny 30–70, komunia/chrzciny, firmy, konsolacja, święta |
| `/catering/` | **menu cateringowe 2026 z koszykiem** (ceny z ich grafiki menu), próg darmowego dowozu 300 zł, termin „do środy”, wysyłka SMS/mail |
| `/bal-andrzejkowy/` | 21.11.2026, program godzinowy, co w cenie, rezerwacja, FAQ, schema Event |
| `/galeria/` | 41 prawdziwych zdjęć z filtrem i podglądem (zero stocku) |
| `/kontakt/` | dane, formularz z podpowiedzią terminu (sobota w sezonie = 12–18 mies.), mapa |

Styl: kość słoniowa + czerń + stonowane złoto (jak ich sala: białe wnętrze, czarny sufit, złote świeczniki), Cormorant Garamond + Jost,
jedna ciemna sekcja (bal). Bez animacji przy przewijaniu, bez pigułek i wielkich liczb.

Wszystkie liczby pochodzą z ich strony. Tam, gdzie ich strona sama sobie przeczy, wybrane jest źródło szczegółowsze (podstrona /wesele/).
