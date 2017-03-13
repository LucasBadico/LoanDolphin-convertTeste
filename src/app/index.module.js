(function() {
    'use strict';

    angular
        .module('inspinia', ['ngAnimate', 'ngCookies','ngUpload', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router',  'ui.bootstrap', 'ngFileUpload', 'colorpicker.module', 'toaster', 'ngDialog', '720kb.datepicker', 'ui.mask','angularTrix','checklist-model'])
	
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})
	
.factory('EventDispatcher',
                 function() {
        var ob;//objeto para guarda o argumento que nao estava sendo passado para EventDispatcher
        var EventDispatcher =  function() {
            //use this $log for handle error (thinking on build a constructor for constructors, it will add a option for log out from the caller. Back to this in future)
            //$log.warn('ob',ob);
            //$log.warn('target',ob.target);
            var listners = {};

            ob.addEventListner = function(type,listner) {
                if(!listners[type]){
                    listners[type] = [];
                }

                if(listners[type].indexOf(listner)== -1) {
                    listners[type].push(listner);
                }
            }

            ob.dispachEvent = function(e) {
                var a = listners[e.type];
                if(a){
                    for(var index in a) {
                        a[index].call(e.target,e);
                        //$log.info('firing ->', e.type);
                    }
                }
            }

        };


        return (
            {
                builder:function(o) {
                    ob = o;
                    EventDispatcher.call(o);
                }

            }
        )
    })
.factory('DateService', ['$rootScope','$compile',function ($rootScope,$compile){  
			  //
			  //private
			  //
			  // HTML  CSS  JS  ResultEdit on 
			function getTimeRemaining(endtime) {
			  var t = Date.parse(endtime) - Date.parse(new Date());
			  var seconds = Math.floor((t / 1000) % 60);
			  var minutes = Math.floor((t / 1000 / 60) % 60);
			  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			  var days = Math.floor(t / (1000 * 60 * 60 * 24));
			  return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			  };
			}

			function getTimePassing(starttime) {
			  var t = Date.parse(new Date()) - Date.parse(starttime); 
			  var seconds = Math.floor((t / 1000) % 60);
			  var minutes = Math.floor((t / 1000 / 60) % 60);
			  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			  var days = Math.floor(t / (1000 * 60 * 60 * 24));
			  return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			  };
			}

		 	function initializeClock(id, endtime) {
			  var clock = document.getElementById(id);
			  var daysSpan = clock.querySelector('.days');
			  var hoursSpan = clock.querySelector('.hours');
			  var minutesSpan = clock.querySelector('.minutes');
			  var secondsSpan = clock.querySelector('.seconds');

			  function updateClock() {
				var t = getTimeRemaining(endtime);

					daysSpan.innerHTML = t.days;
					hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
					minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
					secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

					if (t.total <= 0) {
					  clearInterval(timeinterval);
					}
				}

				updateClock();
					var timeinterval = setInterval(updateClock, 1000);
			}

			function formattedMonthDate(date) {
				  var d = new Date(date);
				  //console.log(d);
				  var month = new Array(12);

					month[0]=  "Janeiro";
					month[1] = "Fevereiro";
					month[2] = "Março";
					month[3] = "Abril";
					month[4] = "Maio";
					month[5] = "Junho";
					month[6] = "Julho";
					month[7] = "Agosto";
					month[8] = "Setembro";
					month[9] = "Outurbro";
					month[10] = "Novembro";
					month[11] = "Dezembro";
				return month[d.getMonth()];
			}

			function formattedDay(date) {
				var d = new Date(date);
				return d.getDate() + 1;
			}

			function formatedYear(date) {
				var d = new Date(date);
				return d.getFullYear();
			}

			function formattedWeekDate(date) {
				  var d = new Date(date);
				  var weekday = new Array(7);

					weekday[0]=  "Domingo";
					weekday[1] = "Segunda-feira";
					weekday[2] = "Terça-feira";
					weekday[3] = "Quarta-feira";
					weekday[4] = "Quinta-feira";
					weekday[5] = "Sexta-feita";
					weekday[6] = "Sábado";
				return weekday[d.getDay()];

			  } 

			function formattedFullDate(date) {
					var d = new Date(date || Date.now()),
						month = '' + (d.getMonth() + 1),
						day = '' + d.getDate(),
						year = d.getFullYear();

					if (month.length < 2) month = '0' + month;
					if (day.length < 2) day = '0' + day;

					//return [month, day, year].join('/');
				return [day,month,year].join('/');
			}

			function getUTC(date) {
			  var thisData = date || new Date(),
				  ano = thisData.getFullYear(),
				  dia = thisData.getDate(),
				  mes = thisData.getMonth();


			  return new Date(Date.UTC(ano, mes, dia, 0, 0, 0));
			}
		 
			function formattedDateTime(date) {
  				var d = new Date(date || Date.now()),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear(),
					hour = d.getHours(),
					minute = d.getMinutes();
			
				if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
				if (hour.length < 2) month = '0' + month;
                if (minute.length < 2) day = '0' + day;
			
				return [day,month,year].join('/') + ' às ' + [ hour,minute].join(':');
			
			
			}
  //
  //public
  //
	var date = {
        month:  function(umaData){return  formattedMonthDate(umaData)},
        day: function(umaData) { return formattedDay(umaData)},
        year: function(umaData) {return  formatedYear(umaData)},
        fullDate: function(umaData) { return  formattedFullDate(umaData)},
        weekday: function(umaData) {return  formattedWeekDate(umaData)},
        passtime: function(umaData) {return  getTimePassing(umaData)},
		fullDateTime: function(umaData) { return formattedDateTime(umaData)},
        utc: function(umaData) {return  getUTC(umaData) }
   }

    return date;

    }
                          
])
.directive('maskChange', function() {
    return {
        restrict: 'A',
        scope: {
            maskChange: "=",
        },
        require: '?ngModel',
        link: function(scope, elem, attrs, ngModel) {

            var novoTel, flag = false, val;

            elem.off('keyup');
            elem.on('keyup', function(ev) {

                if (/^\d+$/.test(ev.key) || ev.key == 'Backspace' || ev.key == 'Delete') {

                    novoTel = String(ngModel.$viewValue).replace(/[\(\)\_\-/\s]/g, '')

                    if (novoTel.length == 10 && !flag) {
                        flag = true;
                        scope.maskChange = "(99) 9999-9999";
                        scope.$apply();
                    } else if (novoTel.length == 10 && flag) {
                        flag = false;
                        scope.maskChange = "(99) 9?9999-9999";

                        scope.$apply();
                        ngModel.$viewValue += ev.key
                        ngModel.$render();

                    } else if (novoTel.length < 10) {
                        flag = false;
                    }
                }
            })
        }

    };
})
})();
