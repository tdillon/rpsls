import R from 'rpsls'


let inputs = [...<NodeListOf<HTMLInputElement>>document.querySelectorAll('input')];
let result = <HTMLDivElement>document.querySelector('div');
let outcomeCSS = ['tie', 'win', 'lose'];

inputs.forEach(i => i.addEventListener('click', a => {
    let p1 = +(<HTMLInputElement>(a.target)).dataset['move'];
    let p2 = Math.floor(Math.random() * 5);
    let g = R.play(p1, p2);
    let r = document.createElement('div');
    r.className = outcomeCSS[g.outcome];
    r.textContent = `${g.result}`;
    result.insertBefore(r, result.firstChild);
}));