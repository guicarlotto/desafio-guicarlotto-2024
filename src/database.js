class Recinto {
    constructor(numero, bioma, tamanhoTotal, tipoAnimaisExistentes, numeroAnimaisExistentes) {
      this.numero = numero;
      this.bioma = bioma;
      this.tamanhoTotal = tamanhoTotal;
      this.tipoAnimaisExistentes = tipoAnimaisExistentes;
      this.numeroAnimaisExistentes = numeroAnimaisExistentes;
    }
  } // construtor para criar as propriedades da classe recinto
  
  const recintos = [
    new Recinto(1, 'savana', 10, 'macacos', 3),
    new Recinto(2, 'floresta', 5, 'vazio', 0),
    new Recinto(3, 'savana e rio', 7, 'gazela', 1),
    new Recinto(4, 'rio', 8, 'vazio', 0),
    new Recinto(5, 'savana', 9, 'leão', 1)
  ];
  
  class Animal {
    constructor(especie, tamanho, biomas) {
      this.especie = especie;
      this.tamanho = tamanho;
      this.biomas = biomas;
    }
  } 
  
  const animais = [
     new Animal('leão', 3, ['savana']),
     new Animal('leopardo', 2, ['savana']),
     new Animal('crocodilo', 3, ['rio']),
     new Animal('macaco', 1, ['savana', 'floresta']),
     new Animal('gazela', 2, ['savana']),
     new Animal('hipopotamo', 4, ['savana', 'rio']) 
];
  
  animais.forEach(animal => {
    console.log(`Espécie: ${animal.especie}`);
    console.log(`Tamanho: ${animal.tamanho}`);
    console.log(`Biomas: ${animal.biomas.join(', ')}`);
    console.log('-------------------');
  });