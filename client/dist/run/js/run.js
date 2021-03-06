const SpeedMultiplier = 1.0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms / SpeedMultiplier));
}

function createElementFromHTML(html) {
  var div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild; 
}

function SetOverflow(value)
{
    document.body.style.overflow = value ? 'initial' : 'hidden';
    document.body.style.width = value ? 'initial' : '100%';
    document.body.style.height = value ? 'initial' : '100%';
}

async function State1Entry()
{
    async function Reveal()
    {
        return new Promise(r => {
            let html = this.innerHTML;
            this.innerHTML = '';
            let typewriter = new Typewriter(this, {
                delay: 4 / SpeedMultiplier,
                loop: false,
                cursor: ''
            });
            typewriter
                .typeString(html)
                .pauseFor(500 / SpeedMultiplier)
                .callFunction(e => r())
                .start();
        });
    }
    
    async function Good()
    {
        let row = AppendLine.bind(this)('good');
        let size = parseFloat(getComputedStyle(row).fontSize);
        row.style.minHeight = row.style.fontSize = size + 100;
        for(let i = 0; i < 10; i++)
        {            
            row.style.fontSize = size + Math.pow(i, 2);
            await sleep(1000.0 / 60.0);
        }
    }
    
    function PSR24(i)
    {
        switch(i)
        {
            case 1:
            case 2:
            case 5:
            case 6:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 15:
            case 20:
            case 21:
                return 1.0;
            default:
                return 0.0;
        }
    }
    
    async function Run()
    {
        SetOverflow(false);
        document.body.style.cursor = 'none';
        document.body.style.backgroundColor = '#000';
        let main_screen = document.querySelector('.main-screen-turn-on');
        let incoming_transmission = main_screen.querySelector('.incoming-transmission');
        let main_screen__transform = 'scale(12, 12) ';
        main_screen.style.transform = main_screen__transform;
        main_screen.style.transformOrigin = '0% 0%';
        main_screen.style.transform = main_screen__transform + 'translate(-50px, -0px)';
        await sleep(200);
        main_screen.style.transform = main_screen__transform + 'translate(-100px, 50px)';
        await sleep(200);
        main_screen.style.transform = main_screen__transform + 'translate(0px, -100px)';
        await sleep(200);
        for(let i = 0; i < 20; i++)
        {
            let x = 130 + 10 * (i % 2);
            main_screen.style.transform = main_screen__transform + `translate(-${x}px, -60px)`;
            await sleep(10);
        }
        main_screen.style.transform = main_screen__transform + 'translate(-140, -50px)';
        await sleep(200);
        incoming_transmission.innerHTML = '';
        await sleep(1000);
        document.body.style.backgroundColor = '#111';
        await sleep(2000);
        main_screen.style.transform = 'scale(1, 1)';
        var row = createElementFromHTML('<li>INITIALIZATION ERROR</li>');
        row.style.textShadow = '1px 0px 0px rgba(255, 255, 255, 0.1), 3px 0px 1px rgba(255, 255, 255, 0.05), 5px 0px 1px rgba(255, 255, 255, 0.05), 7px 0px 1px rgba(255, 255, 255, 0.1)'
        incoming_transmission.appendChild(row);
        await sleep(5000);
        document.body.style.backgroundColor = '#110';
        incoming_transmission.style.color = '#FDA';
        for(let i = 0; i <= 24; i++)
        {
            incoming_transmission.style.opacity = PSR24(i);
            if(i == 13)
            {
                main_screen.style.transformOrigin = '0% 0%';
                main_screen.style.transform = 'scale(3, 3)';
                incoming_transmission.style.color = '#400';
                incoming_transmission.innerHTML = '<li>YOU WILL NEVER MAKE IT OUT ALIVE</li>';
            }
            await sleep(20);
        }
        incoming_transmission.innerHTML = '';
        document.body.style.backgroundColor = '#000';
        main_screen.style.transform = 'scale(1, 1)';
        SetOverflow(true);
        document.body.style.cursor = 'initial';
    }
    
    function AppendLine(value)
    {
        let ul = this.parentNode.parentNode;
        let this_row = this.parentNode;
        let previous_row = this_row.cloneNode(true);
        ul.insertBefore(previous_row, this_row);
        previous_row.innerHTML = value;
        return previous_row;
    }
    
    function ParseCommandString(command)
    {
        if(command == 'yes')
            Good.bind(this)();
        else if(command == 'run')
            Run.bind(this)();
        else if(command != "")
            AppendLine.bind(this)(`unrecognized command "${command}"`);
    }
    
    function AppendInputRow()
    {
        let row = createElementFromHTML('<li>$<input class="input-line" type="text" autofocus /></li>');
        this.appendChild(row);
        return row;
    }
    
    function InputLineHandler(e) {
        if(e.keyCode == 13)
        {
            let ul = this.parentNode.parentNode;
            let this_row = this.parentNode;
            let previous_row = this_row.cloneNode(true);
            let previous_input = previous_row.querySelector('input');
            
            ul.insertBefore(previous_row, this_row);
            ParseCommandString.bind(this)(this.value);
            
            previous_row.removeChild(previous_input);
            previous_row.innerHTML += this.value;
            this.value = '';
            this.scrollIntoView();
        }
    }
    
    let incoming_transmission = document.querySelector('ul.incoming-transmission');
    var rows = incoming_transmission.querySelectorAll('li');
    for(let row of rows)
    {
        row.style.display = 'block';
        await Reveal.bind(row)();
    }
    let input_row = AppendInputRow.bind(incoming_transmission)();
    let input = input_row.querySelector('input');
    input.addEventListener('keydown', InputLineHandler);
    input.focus();
}

State1Entry();