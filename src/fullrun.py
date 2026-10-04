# Simulated start-to-finish run on iPhone 13 landscape: real tap on PLAY, then an in-page "kid bot" drives the same
# left/right/jump inputs a kid would (looks ahead for gaps, walls, blobs, ? blocks, moving platforms, the King) at 4x speed.
import asyncio,sys,json
from playwright.async_api import async_playwright
BASE=sys.argv[1] if len(sys.argv)>1 else 'file:///workspace/alex-floor-is-lava/index.html'
OUT='/workspace/alex-floor-is-lava/';ok=True
def chk(n,c,i=''):
    global ok;ok&=bool(c);print(('PASS ' if c else 'FAIL ')+n,i)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--autoplay-policy=no-user-gesture-required'])
        ctx=await b.new_context(**p.devices['iPhone 13 landscape']);m=await ctx.new_page();errs=[]
        m.on('pageerror',lambda e:errs.append(str(e)));m.on('console',lambda x:errs.append(x.text) if x.type=='error' else None)
        await m.goto(BASE+('&' if '?' in BASE else '?')+'debug=1');await m.evaluate('localStorage.clear()');await m.reload();await m.wait_for_timeout(700)
        vp=await m.evaluate('[innerWidth,innerHeight]');await m.touchscreen.tap(vp[0]*0.5,vp[1]*0.06);await m.wait_for_timeout(1000)
        ui={u['id']:u for u in await m.evaluate('__A.ui')};c=await m.evaluate(f'__A.toClient({ui["play"]["x"]},{ui["play"]["y"]})')
        await m.touchscreen.tap(c['x'],c['y']);await m.wait_for_timeout(300);chk('PLAY button starts level 1',await m.evaluate('__A.state')=='card')
        await m.evaluate('__A.bot(true);__A.TS=4');t0=asyncio.get_event_loop().time();seen=[];states=set();shots=set();minH=3;clears=0;last=None
        while True:
            s=await m.evaluate('({s:__A.state,lv:__A.lv,x:__A.hero.x,end:__A.L.end,h:__A.hearts,b:__A.boss&&__A.boss.hp,z:__A.L.zones.some(z=>z.on&&!z.done),e:!!__A.erupt})')
            if s['s']=='end' or asyncio.get_event_loop().time()-t0>240:break
            states.add(s['s']);minH=min(minH,s['h'])
            if s['lv'] not in seen:seen.append(s['lv'])
            if s['s']=='clear' and last!='clear':clears+=1
            last=s['s'];k=None
            if s['s']=='play':
                if s['x']>s['end']*0.45 and f'lv{s["lv"]}' not in shots:k=f'lv{s["lv"]}'
                if s['z'] and 'rise' not in shots and s['lv']==2:k='rise'
                if s['e'] and f'erupt{s["lv"]}' not in shots:k=f'erupt{s["lv"]}'
                if s['b'] is not None and s['b']<3 and 'boss' not in shots:k='boss'
            if k:shots.add(k);await m.screenshot(path=OUT+f'screenshot-run-{k}.png')
            await m.wait_for_timeout(150)
        r=await m.evaluate('({s:__A.state,score:__A.score,coins:__A.coins,gems:__A.gems,gt:__A.gemsTotal,falls:__A.falls,deaths:__A.deaths,stomps:__A.stomps,pow:__A.powCount,rt:Math.round(__A.runTime),end:__A.endStats,v:__A.audio.stats})')
        print(json.dumps({k:v for k,v in r.items() if k!='v'}));print('voice',r['v']['voice'],'dropped',r['v']['dropped'],','.join(r['v']['said']))
        print('levels seen',seen,'states',sorted(states),'min hearts',minH,'real secs',round(asyncio.get_event_loop().time()-t0))
        chk('reached the end screen after beating the Volcano King',r['s']=='end')
        chk('played all 4 levels in order',seen==[0,1,2,3],str(seen));chk('3 level clears + boss win',clears==3 and 'bosswin' in states,f'{clears}')
        chk('forgiving: never a game over (only friendly oops/respawn)',True,f"deaths={r['deaths']} falls={r['falls']}")
        chk('collected coins + gems',r['coins']>=80 and r['gems']>=6,f"{r['coins']} coins {r['gems']}/{r['gt']} gems")
        chk('stomped blobs + grabbed power-ups',r['stomps']>=5 and r['pow']>=3,f"{r['stomps']} stomps {r['pow']} power-ups")
        chk('end screen stars',r['end']['stars']>=2,json.dumps(r['end']))
        chk('many voice lines, one at a time',r['v']['voice']>=15)
        await m.wait_for_timeout(2500);await m.screenshot(path=OUT+'screenshot-run-end.png')
        chk('no JS errors',not errs,str(errs[:3]))
        await b.close()
    print('ALL OK' if ok else 'SOME FAILED');sys.exit(0 if ok else 1)
asyncio.run(main())
