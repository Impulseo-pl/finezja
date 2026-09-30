import sys
from playwright.sync_api import sync_playwright
from PIL import Image
pages=sys.argv[1].split(',');w=int(sys.argv[2])
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe")
    pg=b.new_page(viewport={'width':w,'height':900},device_scale_factor=1)
    for name in pages:
        url='http://127.0.0.1:8124/finezja/'+(name if name!='home' else '')+'?team=1'
        pg.goto(url,wait_until='networkidle',timeout=60000)
        pg.evaluate("window.scrollTo(0,document.body.scrollHeight)");pg.wait_for_timeout(800);pg.evaluate("window.scrollTo(0,0)");pg.wait_for_timeout(300)
        out=f'sh_{name.strip("/").replace("/","_") or "home"}_{w}.png';pg.screenshot(path=out,full_page=True)
        im=Image.open(out);H=im.size[1];step=1800 if w>800 else 2400
        for i in range(0,H,step):
            c=im.crop((0,i,w,min(H,i+step)));c=c.resize((c.width*2//3 if w>800 else c.width//1,c.height*2//3 if w>800 else c.height//1));c.save(out[:-4]+f'_{i//step}.png')
        print(out,H)
    b.close()
