
//Criando variavel global para a música
var song
//Criando variavel para o objeto FFt
var fft
//Array vazio - partículas
var particles = [];

//Garantindo que a música carregue propriamente antes de executar
function preload(){
    //carregando a música localmente
    song = loadSound('Gravity.mp3');
}

//Criando o BG
function setup() {
  //Alterando modo do angulo para graus
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  //FFT analizará a música a cada frame e retornará um array de valores
  fft = new p5.FFT()  
}

//Desenhando o BG preto
function draw() {
  // Background RGB
  background(32, 32, 32);

  //Barras do visualizer
  stroke(255, 0 , 255);

  //Retirar o preenchimento de cores entre as ondas
  noFill();

  //Traduzindo o círculo para aparecer na tela
  translate(width / 2, height / 2);

  //Variável para as ondas
  var wave = fft.waveform() 

  //For para verificar uma vez positivo e outra negativa para espelhar o circulo
  for (var t = -1; t <= 1; t += 2){

      //Conectando os pontos com begin,endshape e vertex para ficar mais claro o visual
      beginShape();

      //Esse for correrá de 0 até a largura da tela para obter a cordenada X
      //Usando o for para desenhar metade de um círculo e depois espelhá-lo
      for (var i = 0; i <= 180 ; i += 0.5){ //incrementando em 0,5 para deixar o circulo mais complexo
      //Esse index mapeia a variável do loop for para o índice da onda      
      var index = floor(map(i, 0, 180, 0, wave.length - 1)); //O valor deve ser um INT, por isso usar o "Floor"

      //150 é o valor mínimo do raio do círculo e 350 é o máximo
      var r = map(wave[index], -1, 1, 150, 350)
    
      //Calculando a cordenada de x (multiplicando pela variável T do FOR para poder espelhar o circulo)
      var x = r * sin(i) * t;
      //Coordenada Y 
      var y = r * cos(i);
      vertex(x, y);
  }
  
    endShape();

    //Variável da partícula
    var p = new Particle();
    particles.push(p);

    //Exibindo partículas
    for (var i = particles.lenght - 1; i >=0; i--){
      //removendo particulas fora da tela
      // if (!particles[i].edges()){
        //Atualizando posição
        particles[i].update();
        //Exibindo
        particles[i].show();

      // }else{
        // particles.splice(i, 1);
      // }
      
    }

  }

}

//Verificando quando o mouse clicar na tela para iniciar a música 
function mouseClicked(){
  //Pausar a música com clique se estiver tocando
  if (song.isPlaying()){
    song.pause()
    //fazendo com que as ondas parem também ao clicar, ao invés de voltar a ser uma linha
    noLoop();
  }else{
    //Reproduzir a música com clique caso esteja parada
    song.play();
    loop();
  }
  
}


//Partícula

class Particle {
  constructor(){
    //adicinando partículas aleatórias ao redor do círculo
    this.pos = p5.Vector.random2D().mult(250); //250 é o valor aproximado do perímetro do círculo
    //Dando movimento às partículas
    //Velocidade inicial de 0
    this.vel = createVector(0, 0);
    //Aumentando a aceleração conforme o tempo, aleatorizando a aceleração
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    //Aleatorizar a largura da partícula
    this.w = random (3, 5);

    //Aleatorizando cores particulas
    this.color = [random(200, 255), random(200, 255), random(200, 255)]
  }

  //Atualizando as partículas
  update(){
    //adicionando aceleração na velocidade
    this.vel.add(this.acc);
    //Fazendo as partículas se moverem, adicinando a velocidade na posição
    this.pos.add(this.vel)
  }

  //Removendo as partículas do array quando elas saírem da tela
  // edges(){
  //   //verificando se a posição das particulas é maior q o tamanho da tela 
  //   if (this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < - height / 2 || this.pos.y > height / 2){
  //       return true;
  //   }else{
  //     return false;

  //   }

  // }

  //Método para exibição das partículas
  show(){
    noStroke()
    fill(255)
    //Definindo formato da partícula
    ellipse(this.pos.x, this.pos.y, this.w)
  }

}


////////////////////////////////////////////////////////////////////////////////////////////////



// //Criando variavel global para a música
// var song
// //Criando variavel para o objeto FFt
// var fft
// //Array vazio - partículas
// var particles = [];

// //Garantindo que a música carregue propriamente antes de executar
// function preload(){
//     //carregando a música localmente
//     song = loadSound('Gravity.mp3');
// }

// //Criando o BG
// function setup() {
//   //Alterando modo do angulo para graus
//   angleMode(DEGREES);
//   createCanvas(windowWidth, windowHeight);
//   //FFT analizará a música a cada frame e retornará um array de valores
//   fft = new p5.FFT()  
// }

// //Desenhando o BG preto
// function draw() {
//   // Background RGB
//   background(32, 32, 32);

//   //Barras do visualizer
//   stroke(255, 0 , 255);

//   //Retirar o preenchimento de cores entre as ondas
//   noFill();

//   //Traduzindo o círculo para aparecer na tela
//   translate(width / 2, height / 2);

//   //Variável para as ondas
//   var wave = fft.waveform() 

//   //For para verificar uma vez positivo e outra negativa para espelhar o circulo
//   for (var t = -1; t <= 1; t += 2){

//       //Conectando os pontos com begin,endshape e vertex para ficar mais claro o visual
//       beginShape();

//       //Esse for correrá de 0 até a largura da tela para obter a cordenada X
//       //Usando o for para desenhar metade de um círculo e depois espelhá-lo
//       for (var i = 0; i <= 180 ; i += 0.5){ //incrementando em 0,5 para deixar o circulo mais complexo
//       //Esse index mapeia a variável do loop for para o índice da onda      
//       var index = floor(map(i, 0, 180, 0, wave.length - 1)); //O valor deve ser um INT, por isso usar o "Floor"

//       //150 é o valor mínimo do raio do círculo e 350 é o máximo
//       var r = map(wave[index], -1, 1, 150, 350)
    
//       //Calculando a cordenada de x (multiplicando pela variável T do FOR para poder espelhar o circulo)
//       var x = r * sin(i) * t;
//       //Coordenada Y 
//       var y = r * cos(i);
//       vertex(x, y);
//   }
  
//     endShape();

//     //Variável da partícula
//     var p = new Particle();
//     particles.push(p);

//     //Exibindo partículas
//     for (var i = 0; i < particles.length; i++){
//       particles[i].update();
//       particles[i].show();
//     }

//   }

// }

// //Verificando quando o mouse clicar na tela para iniciar a música 
// function mouseClicked(){
//   //Pausar a música com clique se estiver tocando
//   if (song.isPlaying()){
//     song.pause()
//     //fazendo com que as ondas parem também ao clicar, ao invés de voltar a ser uma linha
//     noLoop();
//   }else{
//     //Reproduzir a música com clique caso esteja parada
//     song.play();
//     loop();
//   }
  
// }


// //Partícula

// class Particle {
//   constructor(){
//     //adicinando partículas aleatórias ao redor do círculo
//     this.pos = p5.Vector.random2D().mult(250); //250 é o valor aproximado do perímetro do círculo
//     //Dando movimento às partículas
//     //Velocidade inicial de 0
//     this.vel = createVector(0, 0);
//     //Aumentando a aceleração conforme o tempo, aleatorizando a aceleração
//     this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

//     //Aleatorizar a largura da partícula
//     this.w = random (3, 5);
//   }

//   //Atualizando as partículas
//   update(){
//     //adicionando aceleração na velocidade
//     this.vel.add(this.acc);
//     //Fazendo as partículas se moverem, adicinando a velocidade na posição
//     this.pos.add(this.vel)
//   }

//   //Removendo as partículas

//   //Método para exibição das partículas
//   show(){
//     noStroke()
//     fill(255, 0 , 255)
//     //Definindo formato da partícula
//     ellipse(this.pos.x, this.pos.y, this.w)
//   }

// }