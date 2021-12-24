/*Lembrete
aleatorizar background
*/

//Variavel de aleatorização dos BG
var ranImg = Math.floor(Math.random() * 5)

//Var aleatorização música
var ranMsc = Math.floor(Math.random() * 3)

//Criando variavel global para a música
var song
//Variavel do BG
var img
//Criando variavel para o objeto FFt
var fft
//Array vazio - partículas
var particles = []

//Garantindo que a música carregue propriamente antes de executar
function preload(){
    //carregando a música localmente   

    switch (ranMsc) {
      case 1:
        ranMsc == 0
        song = loadSound('Made Me This Way.mp3');
        break;

      case 2:
        ranMsc == 1
        song = loadSound('THE BADDEST.mp3')
        break;

      case 3:
        ranMsc == 2
        song = loadSound('Gravity.mp3')
        break;

      default:
        song = loadSound('Gravity.mp3')
        break;
          
  }   

    //carregando o BG
    switch (ranImg) {
      case 1:
        ranImg == 0
        img = loadImage('bg1.gif')
        break;

      case 2:
        ranImg == 1
        img = loadImage('bg2.gif')
        break;

      case 3:
        ranImg == 2
        img = loadImage('bg3.gif')
        break;

        case 4:
        ranImg == 3
        img = loadImage('bg4.gif')
        break;

        case 5:
        ranImg == 4
        img = loadImage('bg5.gif')
        break;

      default:
        img = loadImage('bg.png')
        break;
          
  }   


}

//Criando o BG
function setup() {
  //Alterando modo do angulo para graus
  angleMode(DEGREES);
  //Centralizando img
  imageMode(CENTER)
  //Centralizando o retângulo
  rectMode(CENTER)


  createCanvas(windowWidth, windowHeight);
  //FFT analizará a música a cada frame e retornará um array de valores / Suavizando o fade do retangulo
  fft = new p5.FFT(0.3)  
  //Aplicando blur no BG
  img.filter(BLUR, 12)

  noLoop()
}

//Desenhando o BG preto
function draw() {
  // Background RGB
  background(32, 32, 32);

  //Barras do visualizer
  stroke(255, 0 , 255);

  //Grossura
  strokeWeight(3)

  //Retirar o preenchimento de cores entre as ondas
  noFill();

  //Traduzindo o círculo para aparecer na tela
  translate(width / 2, height / 2);

  //Analisando as frequências
  fft.analyze()

  //Fazendo as partículas responderem à frequências baixas
  amp = fft.getEnergy(20, 130)

  //Fazendo o BG rotacionar um pouco para reagir com a música
  push()
  if(amp > 160){
    rotate(random(-0.5, 0.5))
  }

  //Add imagem e fazendo a imagem ficar um pouco maior 
  image(img, 0, 0, width + 100, height + 100)
  pop()

  //Retângulo escuro que altera de acordo com a variavel amp
  var alpha = map(amp, 0, 255, 180, 150)
  fill(0, alpha)
  rect(0, 0, width, height)
  

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
    
      //Calculando a cordenada de x (multiplicando pela variável T do FOR para desenhar metade do circulo)
      var x = r * sin(i) * t;
      //Coordenada Y 
      var y = r * cos(i);
      vertex(x, y);
     }

     endShape();

  }

  //Variável da partícula
  var p = new Particle()
  particles.push(p)
  
  //Exibindo partículas
  for (var i = particles.length -1; i >= 0; i--){

    if(particles[i].edges()){
      //Definindo a frequência da música para atualização das ondas
      particles[i].update(amp > 230)
      particles[i].show()

    }else{
      particles.splice(1, 1)
      
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
    this.pos = p5.Vector.random2D().mult(250)
    //Dando movimento às partículas
    //Velocidade inicial de 0
    this.vel = createVector(0, 0)
    //Aumentando a aceleração conforme o tempo, aleatorizando a aceleração
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    //Aleatorizar a largura da partícula
    this.w = random(3, 5)

    this.color = [random(0,255,255), random((255,0,255)), random((144, 0, 255))]
  }

  //Atualizando as partículas
  update(cond){
    //adicionando aceleração na velocidade
    this.vel.add(this.acc)
    //Fazendo as partículas se moverem, adicinando a velocidade na posição
    this.pos.add(this.vel)

    //Verificação da frequência para adicionar velocidade às particulas ao reagir com o som
    if(cond){
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }

  }

  //Removendo as partículas
  edges(){
    if (this.pos.x < - width / 2 || this.pos.x < width / 2 || this.pos.y < -height / 2 || this.pos.y < height / 2){
      return true
  
    }else{
      return false
    }
  }

  //Método para exibição das partículas
  show(){
    noStroke()
    fill(this.color)
    //Definindo formato da partícula
    ellipse(this.pos.x, this.pos.y, this.w)

  }

}