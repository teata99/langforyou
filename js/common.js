        window.addEventListener('keydown', function(event) {
            if(event.defaultPrevented) {
                return;
            }

            switch(event.key) {
                case "Down":
                case "ArrowDown":
                            moveClassPage(1);
                            break;
                case "Up":
                case "ArrowUp":
                            moveClassPage(-1);
                            break;
                case "Left":
                case "ArrowLeft":
                            movePage(-1);
                            break;
                case "Right":
                case "ArrowRight":
                            movePage(1);
                            break;                    
            }
            
            if(window.event.keyCode == 13) {
                correctOn();
            }

            //event.preventDefault();
        });
        
        window.addEventListener('keyup', function(event) {
            if(window.event.keyCode == 13) {
                correctOff();
            }            
        });