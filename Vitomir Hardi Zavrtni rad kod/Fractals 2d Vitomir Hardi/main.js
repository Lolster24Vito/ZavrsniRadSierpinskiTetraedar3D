	//Definiranje potrebnih varijabli za rad.  
	let canvas = document.getElementById("canvas"),  
	    context = canvas.getContext("2d"),  
	    width = canvas.width = window.innerWidth / 1.5,  
	    height = canvas.height = window.innerHeight / 1.5;  
	let level = 7;  
	  
	//Tri točke koje koristimo prilikom pravljenja trokuta. 
	let p0 = {  
	        x: canvas.width / 2,  
	        y: 0  
	    },  
	    p1 = {  
	        x: canvas.width,  
	        y: canvas.height  
	    },  
	    p2 = {  
	        x: 0,  
	        y: canvas.height  
	    };  
	  
	  
	sierpinski(p0, p1, p2, level);  
	  
	//funkcija za crtanje trokuta sa parametrima točaka trokuta.  
	function drawTriangle(p0, p1, p2) {  
	  
	    context.beginPath();  
	    context.moveTo(p0.x, p0.y);  
	    context.lineTo(p1.x, p1.y);  
	    context.lineTo(p2.x, p2.y);  
	    context.fill();  
	}  
	  
	//funkcija koja crta trokut sierpinskog  
	function sierpinski(p0, p1, p2, limit) {  
	    if (limit > 0) {  
	  
	        let pA = {  
	                x: (p0.x + p1.x) / 2,  
	                y: (p0.y + p1.y) / 2  
	            },  
	            pB = {  
	                x: (p1.x + p2.x) / 2,  
	                y: (p1.y + p2.y) / 2  
	            },  
	            pC = {  
	                x: (p2.x + p0.x) / 2,  
	                y: (p2.y + p0.y) / 2  
	            };  
	  
	        sierpinski(p0, pA, pC, limit - 1);  
	        sierpinski(pA, p1, pB, limit - 1);  
	        sierpinski(pC, pB, p2, limit - 1);  
	  
	    } else {  
	        drawTriangle(p0, p1, p2);  
	    }  
	}  
	  
	//Funkcija koja crta trokut sierpinskog za jednu višu razinu  
	function PlusButton() {  
	    if (level < 12) {  
	        level += 1;  
	        context.clearRect(0, 0, canvas.width, canvas.height);  
	        sierpinski(p0, p1, p2, level);  
	        document.getElementById("level").textContent = level;  
	    }  
	}  
	  
	//Funkcija koja crta trokut sierpinskog za jednu nižu razinu  
	function MinusButton() {  
	    if (level > 0) {  
	        level -= 1;  
	        context.clearRect(0, 0, canvas.width, canvas.height);  
	        sierpinski(p0, p1, p2, level);  
	        document.getElementById("level").textContent = level;  
	    }  
	}  
