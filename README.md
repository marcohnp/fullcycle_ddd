# Desafios Curso Full Cycle 3.0 | DDD: Modelagem Tática e Patterns

### Desafio 1: Implementar métodos do OrderRepository
**Descrição**: Nesse desafio é necessário que classe OrderRepository implemente totalmente os métodos definidos pelo OrderRepositoryInterface. Toda essa implementação deverá ser reproduzida através de testes.  
  
**GitHub**: https://github.com/marcohnp/fullcycle_ddd/

### Desafio 2: Eventos de Customer
**Descrição**: Agora que você já possui a base sobre Domain Events, implemente dois Eventos de Domínio para o agregado de Customer.
O primeiro evento deverá acontecer quando um novo Customer é criado. Nesse ponto, crie 2 handlers exibindo um "console.log".   
  
Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".  
Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: CustomerCreated".  
  
O segundo evento deverá ser disparado quando o endereço do Customer é trocado (método changeAddress()). Nesse caso, o ID, Nome, bem como os dados do endereço devem ser passados ao evento.  
  
Handler: EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: {id}, {nome} alterado para: {endereco}".
  
**Branch com implementação do desafio**: feature/customer_event
