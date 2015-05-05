'use strict';

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketFactory',
    function(socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect('http://ukkk6aef799c.keenanmkarich.koding.io:3000')
        });
    }
]);