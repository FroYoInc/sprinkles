module Config {
    export class Service {
        public getPortString():String {
            return "3000";
        }
        public getHostString():String {
          return "http://localhost:";
        }
    }


}

/*angular.module('app.services.helloService', []).factory('helloService', () => {
    return new MyModule.HelloService();
});*/
app.services.service('ConfigService', Config.Service);
