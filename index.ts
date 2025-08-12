class Livro{
titulo: string;
categoria: string;
ano:number;
autor:string;
emprestado: boolean;
prazoDevolucao: number | undefined;

constructor(titulo:string,categoria:string,ano:number,autor:string){
this.titulo = titulo;
this.categoria = categoria;
this.ano = ano;
this.autor = autor;
this.emprestado = false;
}
} 

class Biblioteca{
livros:Array<Livro>;
cadastro:Array<string>;
contador:number;
constructor(){
this.cadastro = [];
this.livros = [];
this.contador =0;
}
AdicionarLivro(){
let menu = "📚 Adicionar Livros:\n";
let titulo = prompt(menu+'Digite um titulo:\n\n Preecher somente com nome!');
let categoria = prompt(menu+'Digite uma categoria:\n\n Preecher somente com nome!');
let ano1 = prompt(menu+'Digite ano:\n\n Preecher somente com numero!');
let autor = prompt(menu+ 'Digite um autor:\n\n Preecher somente com nome!');
if(!titulo || !categoria ||  !ano1 || !autor){
alert('⚠ Preecha todos os campos para adicionar livros');
}else{
let ano = Number(ano1);
if(isNaN(ano)){
alert('⚠ Ano invalido');
return;
}
let jaexiste:boolean;
jaexiste = false;
for(let i = 0; i<this.livros.length;i++){
if(this.livros[i]!.titulo == titulo && this.livros[i]!.categoria == categoria && this.livros[i]!.ano == ano && this.livros[i]!.autor == autor){
jaexiste = true;
}
}
if(jaexiste){
alert('⚠ Livro ja adicionado');
}else{
let novo = new Livro(titulo,categoria,ano,autor);
this.livros.push(novo);
alert('Livro adicionado com sucesso');
}
}
}
Listalivros(){
if(this.livros.length == 0){//verifica se tem livros adicionado no array livros 
alert('Nenhum livro adicionado para listar');//se nao tiver ele emprime essa memsagem
}else{
let lista = "📚 Lista:\n";
for(let i =0; i<this.livros.length;i++){
lista = lista +(i+1)+ '->' +(this.livros[i]!.titulo)+ '('+(this.livros[i]!.categoria)+')'+'('+(this.livros[i]!.ano)+')'+'('+(this.livros[i]!.autor)+')'+"\n";
}
alert(lista);
}
}
RemoverLivros(){
if(this.livros.length == 0){//verifica se tem livros adicionado no array livros 
alert('⚠ Nenhum livro adicionado para remover');//se nao tiver ele emprime essa memsagem
}else{
let lista = '📚 Lista: \n';
for(let i = 0; i < this.livros.length; i++){
lista = lista +(i+1)+ '->' +(this.livros[i]!.titulo)+ '('+(this.livros[i]!.categoria)+')'+'('+(this.livros[i]!.ano)+')'+'('+(this.livros[i]!.autor)+')'+"\n";
}
let resposta:number;
resposta = Number(prompt(lista + 'Escolha o numero do livro para remover:')!);//pergunta para o usuario
if(resposta >= 1 && resposta <= this.livros.length){//so permite resposta >= 1 <=tamanho do array
this.livros.splice(resposta - 1, 1);//remove o livro na pos certa ex:(1 - 1,1); = pos 1 - 1 = 0; remove um elemento
alert('Livro removido com sucesso');
}else{
alert('⚠ Opção invalida');
}
}
}
Buscarlivros(){
let resposta:string;
resposta = String(prompt('Pesquisar livros: \n'));
if(resposta == null || resposta == ""){
alert('⚠ Operacao cancelada');
return;
}
let jaexiste:boolean;
jaexiste = false;
for(let i = 0;i<this.livros.length;i++){
if(this.livros[i]!.titulo == resposta || this.livros[i]!.autor == resposta){
jaexiste = true;
}
}
if(!jaexiste){
alert('📚 Lista: \n\n Livro nao encontrado');
}else{
let resultado = "Resultado: \n";
for(let i = 0; i<this.livros.length;i++){
if(this.livros[i]!.titulo == resposta  || this.livros[i]!.autor == resposta){
resultado = resultado+(i+1)+ '->' +(this.livros[i]!.titulo)+ '('+(this.livros[i]!.categoria)+')'+'('+(this.livros[i]!.ano)+')'+'('+(this.livros[i]!.autor)+')'+"\n";
}
}
alert(resultado);
}
}
Cadastrousuario(){
if(this.contador >= 1){
let resposta:number;
resposta = Number(prompt('Voce esta bloqueado de fazer emprestimo:'+(this.contador)+'\n1->Pagar multa\n\nDigite "1" para pagar multa!'));
if(resposta ==1){
this.contador = 0;
alert('Multa paga com sucesso, acesso liberado!');
}else{
alert('Opção invalido');
return;
}
}
let resposta: number;
resposta = Number(prompt('Menu:\n1-> Cadastrar novo\n2-> Login'));
// CADASTRO
if(resposta == 1){
let nome: string = String(prompt('Cadastro:\n-> Nome:'));
let senha: string = String(prompt('Cadastro:\n-> Senha:'));
if(!nome || !senha){
alert('⚠ Preencha todos os campos para cadastrar a conta');
return;
}
let jaexiste: boolean = false;
for (let i = 0; i < this.cadastro.length; i = i + 2){
if(this.cadastro[i] == nome && this.cadastro[i + 1] == senha){
jaexiste = true;
}
}
if(jaexiste){
alert('⚠ Conta já cadastrada, faça o login direto');
}else{
this.cadastro.push(nome,senha);
alert('Conta cadastrada com sucesso');
}
}
if(resposta == 2){
let nome1: string = String(prompt('Login:\n-> Digite seu usuário'));
let senha1: string = String(prompt('Login:\n-> Digite sua senha'));
if(!nome1 || !senha1){
alert('⚠ Operação cancelada');
return;
}
let jaexiste:boolean;
jaexiste = false;
for(let i = 0; i < this.cadastro.length; i = i + 2){
if(this.cadastro[i] == nome1 && this.cadastro[i + 1] == senha1){
jaexiste = true;
}
}
if(!jaexiste){
alert('⚠ Senha ou usuário incorretos');
}else{
alert('Acesso liberado');
let acao = Number(prompt("1-> Emprestar livro\n2-> Devolver livro"));
// EMPRESTAR
if(acao == 1){
let disponiveis = this.livros.filter(l => !l.emprestado);//cria um novo array com os que passaram no teste = 
if (disponiveis.length == 0) {
alert("⚠ Nenhum livro disponível para empréstimo.");
return;
}
let lista = "Lista: livros disponíveis para empréstimo:\n\n";
for(let i = 0; i < disponiveis.length; i++){
lista = lista +(i + 1)+ '->' +(disponiveis[i]!.titulo)+ '('+(disponiveis[i]!.categoria)+')'+'('+(disponiveis[i]!.ano)+')'+'('+(disponiveis[i]!.autor)+')'+'\n';
}
let escolha = Number(prompt(lista + "\nEscolha um número acima para pedir empréstimo:")) - 1;
if(disponiveis[escolha]){
disponiveis[escolha].emprestado = true;
disponiveis[escolha].prazoDevolucao = Date.now() + 30 * 1000; // 30 segundos
alert(`Livro emprestado! Prazo: 30 segundos.`);
}else{
alert("⚠Livro inválido ou já emprestado.");
}
}
// DEVOLVER
if(acao == 2){
let tituloDev = prompt("Digite o título do livro para devolver:");
let encontrado = false;
for(let i = 0; i < this.livros.length; i++){
if(this.livros[i]!.titulo == tituloDev && this.livros[i]!.emprestado){
encontrado = true;
let agora = Date.now();
if (this.livros[i]?.prazoDevolucao !== undefined && agora <= this.livros[i]!.prazoDevolucao!){
alert("Devolução no prazo! Nenhuma multa.");
}else{
alert("⚠ Atrasado! Multa aplicada.");
this.contador = this.contador + 1;
}
this.livros[i]!.emprestado = false;
this.livros[i]!.prazoDevolucao = undefined;
return;
}
}
if(!encontrado){
alert("⚠ Livro não encontrado ou não está emprestado.");
}
}
}
}
}
}
let minhaBiblioteca = new Biblioteca();//cria o biblioteca
//mostrar opcoes
//permitir que o usuário escolha uma opção
//retornar a opção (0-> sair, 1->func 01, 2->func 02, 3->func 03...)
function acessar():number{
let resposta:number;
resposta = Number(prompt('|-------------------------------BIBLIOTECA----------------------------------|Menu:\n1-> Adicionar Livros\n2📚-> Lista Livros\n3🚮-> Excluir Livros\n4-> Buscar livros\n5-> Emprestimo de livros\n6-> Sair'));
while (isNaN(resposta) || resposta < 0 || resposta > 7) {
alert('opção inválida');
resposta = Number(prompt('Menu:\n1-> Adicionar Livros\n2📚-> Lista Livros\n3🚮-> Excluir Livros \n4-> Buscar livros\n5-> Emprestimo de livros\n6-> Sair'));
}
return resposta;
}
function executarOpcao(opcao:number){
if (opcao == 1) {
minhaBiblioteca.AdicionarLivro();
}
if (opcao == 2) {
minhaBiblioteca.Listalivros();
}
if (opcao == 3) {
minhaBiblioteca.RemoverLivros();
}
if (opcao == 4) {
minhaBiblioteca.Buscarlivros();
}
if (opcao == 5) {
minhaBiblioteca.Cadastrousuario();
}
}
let desejaSair:boolean = false;
while(!desejaSair){
let resposta;
resposta = acessar();
if(resposta != 6){
executarOpcao(resposta);
}else{
alert('Adeus e obrigado por todos os peixes.');
desejaSair = true;
}
}