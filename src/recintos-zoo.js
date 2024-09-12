class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, tipoAnimaisExistentes: 'macaco', numeroAnimaisExistentes: 3 },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, tipoAnimaisExistentes: 'vazio', numeroAnimaisExistentes: 0 },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, tipoAnimaisExistentes: 'gazela', numeroAnimaisExistentes: 1 },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, tipoAnimaisExistentes: 'vazio', numeroAnimaisExistentes: 0 },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, tipoAnimaisExistentes: 'leão', numeroAnimaisExistentes: 1 }
    ];

    this.animais = [
      { especie: 'leão', tamanho: 3, biomas: ['savana'], carnívoro: true },
      { especie: 'leopardo', tamanho: 2, biomas: ['savana'], carnívoro: true },
      { especie: 'crocodilo', tamanho: 3, biomas: ['rio'], carnívoro: true },
      { especie: 'macaco', tamanho: 1, biomas: ['savana', 'floresta'], carnívoro: false },
      { especie: 'gazela', tamanho: 2, biomas: ['savana'], carnívoro: false },
      { especie: 'hipopotamo', tamanho: 4, biomas: ['savana', 'rio'], carnívoro: false }
    ];
  } // Decidi usar construtor e objetos pois no meu pensamento ficaria muito mais organizado, também estava pensando em possíveis adições posteriores, dessa forma é bem fácil adicionar novos animais e recintos.

    // A partir desse momento no código decidi usar funções para tudo, para deixar mais claro o entendimento, mais fácil de resolver eventuais problemas e também tornar ele modular.
  analisaRecintos(tipoAnimal, quantidade) {
    const animal = this.verificaAnimal(tipoAnimal);
    if (!animal) return { erro: "Animal inválido" };

    if (!this.verificaValidadeQuantidade(quantidade)) return { erro: "Quantidade inválida" };

    const recintosViaveis = this.recintos
      .filter(recinto => this.viabilidadeRecinto(recinto, animal, quantidade))
      .map(recinto => this.formatRecinto(recinto, animal, quantidade))
      .sort();

    return recintosViaveis.length > 0
      ? { recintosViaveis }
      : { erro: "Não há recinto viável" };
  } // Aqui eu verifico se o inserido animal é válido, se a quantidade inserida é válida e também verifico se o recinto é viável, para fazer isso utilizo algumas das funções abaixo.

  verificaAnimal(tipoAnimal) {
    return this.animais.find(animal => animal.especie.toLowerCase() === tipoAnimal.toLowerCase());
  } // Essa função serve pra verificar se o tipo de inserido animal é encontrado no nosso objeto animais. 

  verificaValidadeQuantidade(quantidade) {
    return typeof quantidade === 'number' && quantidade > 0;
  } // Aqui verificamos se a quantidade inserida é válida.

  viabilidadeRecinto(recinto, animal, quantidade) {
    const biomaAdequado = this.viabilidadeBiomaAdequado(recinto, animal);
    const capacidadeSuficiente = this.verificaCapacidadeSuficiente(recinto, animal, quantidade);
    const tipoAnimalAtualNoRecinto = recinto.tipoAnimaisExistentes.toLowerCase();

    return biomaAdequado && capacidadeSuficiente &&
      this.verificaConfortoAnimal(recinto, animal, quantidade, tipoAnimalAtualNoRecinto) &&
      this.verificaCarnivoroNoRecinto(recinto, animal, quantidade);
  } // Aqui verificamos se o recinto é viável para o animal e a quantidade inserida, para fazer isso ele utiliza aas funções abaixo.

  viabilidadeBiomaAdequado(recinto, animal) {
    const biomasRecinto = recinto.bioma.toLowerCase().split(' e ');
    const biomasAnimal = animal.biomas.map(bioma => bioma.toLowerCase());
    return biomasRecinto.some(bioma => biomasAnimal.includes(bioma));
  } // Aqui éle verifica se o animal e o recinto são competíveis em relação ao bioma.

  verificaCapacidadeSuficiente(recinto, animal, quantidade) {
    const espacoOcupadoAtual = this.calculaEspacoOcupado(recinto);
    const espacoNecessario = quantidade * animal.tamanho;
    const espacoExtra = this.calculaEspacoExtra(recinto, animal, quantidade);
    return espacoOcupadoAtual + espacoNecessario + espacoExtra <= recinto.tamanhoTotal;
  } // Aqui ele veridica se o recinto tem capacidade suficiente para abriar a quantidade do animal inserida.

  calculaEspacoOcupado(recinto) {
    const animalAtual = this.animais.find(animal => animal.especie.toLowerCase() === recinto.tipoAnimaisExistentes.toLowerCase());
    return animalAtual ? recinto.numeroAnimaisExistentes * animalAtual.tamanho : 0;
  } // Aqui ele calcula o espaço ocupado no recinto pelos animais que já estão nele, caso hajam.

  verificaConfortoAnimal(recinto, animal, quantidade, tipoAnimalAtualNoRecinto) {
    if (animal.especie.toLowerCase() === 'macaco') {
      return tipoAnimalAtualNoRecinto !== 'vazio' || quantidade > 0;
    }
  
    if (animal.especie.toLowerCase() === 'hipopotamo') {
      if (tipoAnimalAtualNoRecinto === 'vazio') {
        return recinto.bioma.includes('savana') || recinto.bioma.includes('rio');
      } else {
        return recinto.bioma.includes('savana') && recinto.bioma.includes('rio');
      }
    } 
  
    if (animal.carnívoro) {
      return tipoAnimalAtualNoRecinto === animal.especie.toLowerCase() || tipoAnimalAtualNoRecinto === 'vazio';
    }
    
    return true;
  } // Essa função vai tratar de algumas especificidades de alguns tipos de animais.

  calculaEspacoExtra(recinto, animal, quantidade) {
    const tipoAnimalAtualNoRecinto = recinto.tipoAnimaisExistentes.toLowerCase();
    let espacoExtra = 0;
    
    if (tipoAnimalAtualNoRecinto !== 'vazio' && tipoAnimalAtualNoRecinto !== animal.especie.toLowerCase()) {
      espacoExtra = 1;
    }
    
    return espacoExtra;
  } // Essa função é para calular o espaço extra necessário para que animais de tipos diferentes coexistam no mesmo recinto.

  verificaCarnivoroNoRecinto(recinto, animal, quantidade) {
    const tipoAnimalAtualNoRecinto = recinto.tipoAnimaisExistentes.toLowerCase();
  
    if (animal.carnívoro) {
      return tipoAnimalAtualNoRecinto === 'vazio' || tipoAnimalAtualNoRecinto === animal.especie.toLowerCase();
    }
  
    const animalAtualNoRecinto = this.animais.find(a => a.especie.toLowerCase() === tipoAnimalAtualNoRecinto);
    const recintoTemCarnivoro = animalAtualNoRecinto ? animalAtualNoRecinto.carnívoro : false;
    
    return !(recintoTemCarnivoro);
  } // Essa função verifica se já existem animais carnívoros no recinto.
  
  verificaAnimalCarnivoro(tipoAnimal) {
    const animal = this.animais.find(a => a.especie.toLowerCase() === tipoAnimal.toLowerCase());
    return animal ? animal.carnívoro : false;
  } // Essa função verifica se o tipo de animal é carnívoro.

  formatRecinto(recinto, animal, quantidade) {
    const espacoOcupado = this.calculaEspacoOcupado(recinto, animal) + quantidade * animal.tamanho + this.calculaEspacoExtra(recinto, animal, quantidade);
    const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
    return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
  } // Essa função vai formatar a saída da função (analisaRecintos) conforme demanda o teste.
}

export { RecintosZoo };