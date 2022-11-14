/* eslint-disable*/
const app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', 'flightDataFactory', '$timeout', function ($scope, flightDataFactory, $timeout) {
    try {
        function showLoader() {
            $('#status').show();/* jshint ignore:line */
            $('#preloader').show();/* jshint ignore:line */
        }

        function hideLoader() {
            $('#status').hide();/* jshint ignore:line */
            $('#preloader').hide();/* jshint ignore:line */
        }
        hideLoader();
        const tableBody = document.getElementById('table-body');
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });

        function getDaySting(index) {
            var weekday = "--";
            switch (index) {
                case 0:
                    weekday = "Sunday";
                    break;
                case 1:
                    weekday = "Monday";
                    break;
                case 2:
                    weekday = "Tuesay";
                    break;
                case 3:
                    weekday = "Wednesday";
                    break;
                case 4:
                    weekday = "Thursday";
                    break;
                case 5:
                    weekday = "Friday";
                    break;
                case 6:
                    weekday = "Saturday";
                    break;
                default:
                    break;
            }
            return weekday;
        }
        const populateTable = (flights) => {
            console.log("populate table: ", flights);
            $(".tbl-row-flight").remove();
            for (const flight of flights) {
                const tableRow = document.createElement('tr');
                tableRow.classList.add('tbl-row-flight');
                const tableIcon = document.createElement('td');
                tableIcon.textContent = '✈';
                tableRow.append(tableIcon);
                var flightDetails = {
                    time: ($scope.flightUiEditObject.selectedArrDepType === 'departures') ? flight.dep_time : flight.arr_time,
                    destination: ($scope.flightUiEditObject.selectedArrDepType === 'departures') ? flight.dep_iata.toUpperCase() : flight.arr_iata.toUpperCase(),
                    flight: flight.flight_number.toUpperCase(),
                    gate: ($scope.flightUiEditObject.selectedArrDepType === 'departures') ? flight.dep_gate : flight.arr_gate,
                    remarks: flight.status.toUpperCase()
                };
                var time = flightDetails.time;
                if (time) {
                    var date = moment(flightDetails.time);
                    var day = date.day();
                    var weekday = getDaySting(day);
                    var time = moment(date).format("hh:mm");
                    flightDetails.time = weekday + "," + time;
                }
                flightDetails.time = flightDetails.time ? flightDetails.time : "--";
                flightDetails.destination = flightDetails.destination ? flightDetails.destination : "--";
                flightDetails.flight = flightDetails.flight ? flightDetails.flight : "--";
                flightDetails.gate = flightDetails.gate ? flightDetails.gate : "--";
                flightDetails.remarks = flightDetails.remarks ? flightDetails.remarks : "--";
                try {
                    var i = 0;
                    for (var flightDetail in flightDetails) {
                        const tableCell = document.createElement('td');
                        var word = Array.from(flightDetails[flightDetail]);
                        for (const [index, letter] of word.entries()) {
                            const letterElement = document.createElement('div');

                            setTimeout(() => {
                                letterElement.classList.add('flip');
                                letterElement.textContent = letter;
                                tableCell.append(letterElement);
                            }, 100 * index)
                        }
                        tableRow.append(tableCell);
                        i++;
                    }
                    tableBody.append(tableRow);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        $scope.userFlightTableScreen = {
            user: false,
            flight: true,
        };
        $scope.objValidation = {
            show: false,
            message: ""
        }
        $scope.flightUiEditObject = {
            usersList: [],
            userTypes: [],
            registerUser: {
                name: '',
                email: '',
                phone: '',
                password: '',
            },
            loginUser: {
                email: '',
                password: '',
            },
            currentLoggedInUser: {},
            currentSelectedUser: {},
            flights: [],
            selectedFlight: {},
            selectedFlightDetails: {},
            arrDepType: ['departures', 'arrivals'],
            selectedArrDepType: 'departures',
            delayTimings: ['30', '60', '90', '120', '150', '180', '210'],
            selectedDelayTimings: '30',
            arrDepFlightsData: [],
            selectedAirLine: ""
        };
        function hideToaster() {
            $timeout(function () {
                $scope.objValidation.show = false;
                $scope.objValidation.message = "";
            }, 2000);
        }
        function getAllUsers() {
            flightDataFactory.getAllUsers()
                .then(function (result) {
                    if (result) {
                        $scope.flightUiEditObject.usersList = result;
                    }
                }).catch(function (ex) {
                    console.log('ex: ', ex);
                });
        }

        getAllUsers();
        $scope.signUp = function () {
            if ($scope.flightUiEditObject.registerUser) {
                flightDataFactory.registerUser($scope.flightUiEditObject.registerUser)
                    .then(function (result) {
                        getAllUsers();
                        container.classList.remove('right-panel-active');
                    })
                    .catch(function (ex) {
                        console.log(ex);
                    });
            }
        };

        function getFlightsData() {
            $scope.displayFlights();
            showLoader();
            const obj = {
                endpoint: 'airlines',
            };
            flightDataFactory.getFlightsData(obj)
                .then(function (result) {
                    if (result) {
                        function buildOptions(result) {
                            return `<option data-iata_code="${result.iata_code}" data-icao_code="${result.icao_code}">${result.name}</option>`;
                        }
                        let selectHtml = `<select class="selectpicker" id="flight-select-picker" data-show-subtext="true" data-live-search="true">`;
                        for (let index = 0; index < result.length; index++) {
                            selectHtml += buildOptions(result[index]);
                        }
                        selectHtml += `</select>`;
                        $('#flight-select-ctn').append(selectHtml);
                        $('.selectpicker').selectpicker('refresh');
                        $scope.flightUiEditObject.selectedArrDepType = $scope.flightUiEditObject.arrDepType[0];
                        $scope.flightUiEditObject.selectedDelayTimings = $scope.flightUiEditObject.delayTimings[0];
                        $scope.selectedAirLine = result[0].name;
                        $scope.flightDataChanged();
                        hideLoader();
                    }
                }).catch(function (ex) {
                    console.log('ex: ', ex);
                });
        }

        $scope.flightDataChanged = function () {
            $scope.flightUiEditObject.arrDepFlightsData = [];
            showLoader();
            $scope.selectedAirLine = $('#flight-select-picker').val();
            const obj = {
                endpoint: 'delays',
                type: $scope.flightUiEditObject.selectedArrDepType,
                delay: String($scope.flightUiEditObject.selectedDelayTimings),
                airline_icao: ($('#flight-select-picker').find(':selected').attr('data-icao_code')) ? $('#flight-select-picker').find(':selected').attr('data-icao_code') : '',
                airline_iata: ($('#flight-select-picker').find(':selected').attr('data-iata_code')) ? $('#flight-select-picker').find(':selected').attr('data-iata_code') : '',
            };
            flightDataFactory.getDelaysData(obj)
                .then(function (result) {
                    if (result.length > 0) {
                        populateTable(result);
                        $scope.flightUiEditObject.arrDepFlightsData = result;
                    }
                    hideLoader();
                })
                .catch(function (ex) {
                    console.log(ex);
                });
        };

        $(document).on('change', '#flight-select-picker', function () {
            $scope.flightDataChanged();
        });

        $scope.signIn = function () {
            if ($scope.flightUiEditObject.loginUser) {
                for (let index = 0; index < $scope.flightUiEditObject.usersList.length; index++) {
                    if (($scope.flightUiEditObject.usersList[index].email.toLowerCase() == $scope.flightUiEditObject.loginUser.email.toLowerCase()) && ($scope.flightUiEditObject.usersList[index].pass == $scope.flightUiEditObject.loginUser.password)) {
                        // show flight data screen
                        $scope.flightUiEditObject.currentLoggedInUser = $scope.flightUiEditObject.usersList[index];
                        $scope.screens.login = false;
                        $scope.screens.flight = true;
                        $scope.flightUiEditObject.currentLoggedInUser.sessionStart = new Date();
                        $scope.flightUiEditObject.currentLoggedInUser.screen = $scope.screens;
                        localStorage.setItem("currentuser", JSON.stringify($scope.flightUiEditObject.currentLoggedInUser));
                        getFlightsData();
                        // populateTable($scope.flights);
                        break;
                    }
                    else {
                        $scope.objValidation.show = true;
                        $scope.objValidation.message = "Invalid Email or Password";
                        hideToaster();
                    }
                }
            }
        };
        $scope.displayUsers = function () {
            $scope.userFlightTableScreen.flight = false;
            $scope.userFlightTableScreen.user = true;
            localStorage.setItem("currentScreen", JSON.stringify($scope.userFlightTableScreen));
        };
        $scope.displayFlights = function () {
            $scope.userFlightTableScreen.flight = true;
            $scope.userFlightTableScreen.user = false;
            localStorage.setItem("currentScreen", JSON.stringify($scope.userFlightTableScreen));
        };
        $scope.deleteUser = function (user) {
            flightDataFactory.deleteUser(user.id)
                .then(function (result) {
                    getAllUsers();
                })
                .catch(function (ex) {
                    console.log(ex);
                });
        };
        $scope.updateUserModal = function (user) {
            if (user.utype == 1) {
                user.isAdminAccess = true;
            }
            else {
                user.isAdminAccess = false;
            }
            $scope.flightUiEditObject.currentSelectedUser = user;
            $('#myModal').modal('show');
        };
        $scope.updateUser = function () {
            if ($scope.flightUiEditObject.currentSelectedUser.isAdminAccess) {
                $scope.flightUiEditObject.currentSelectedUser.utype = 1;
            }
            else {
                $scope.flightUiEditObject.currentSelectedUser.utype = 2;
            }
            var updateObject = {
                id: $scope.flightUiEditObject.currentSelectedUser.id,
                name: $scope.flightUiEditObject.currentSelectedUser.name,
                password: $scope.flightUiEditObject.currentSelectedUser.pass,
                phone: $scope.flightUiEditObject.currentSelectedUser.phone,
                email: $scope.flightUiEditObject.currentSelectedUser.email
            }
            console.log("updateObject send", updateObject);
            flightDataFactory.updateUser(updateObject)
                .then(function (result) {
                    console.log("updateUser: ", result);
                    var obj = {
                        userId: $scope.flightUiEditObject.currentSelectedUser.id,
                        typeId: $scope.flightUiEditObject.currentSelectedUser.utype
                    };
                    flightDataFactory.updateMapping(obj)
                        .then(function (result) {
                            console.log("updateMapping: ", result);
                            getAllUsers();
                            $('#myModal').modal('hide');
                        })
                        .catch(function (ex) {
                            console.log(ex);
                        });
                })
                .catch(function (ex) {
                    console.log(ex);
                });
        };
        //check cache if 10 mins passed then login else last state
        function checkLocalStorage() {
            var obj = JSON.parse(localStorage.getItem("currentuser"));
            if (obj) {
                var diffMilliseconds = new Date() - new Date(obj.sessionStart);
                var diffMin = diffMilliseconds / 60000;
                if (diffMin > 10) {
                    $scope.screens = {
                        login: true,
                        flight: false
                    };
                }
                else {
                    $scope.flightUiEditObject.currentLoggedInUser = obj;
                    $scope.screens = obj.screen;
                    var currentScreen = JSON.parse(localStorage.getItem("currentScreen"));
                    if (currentScreen.flight) {
                        getFlightsData();
                        $scope.userFlightTableScreen.flight = true;
                        $scope.userFlightTableScreen.user = false;
                    }
                    else {
                        getAllUsers();
                        $scope.userFlightTableScreen.flight = false;
                        $scope.userFlightTableScreen.user = true;
                    }
                }
            }
            else {
                $scope.screens = {
                    login: true,
                    flight: false,
                };
            }

        }
        checkLocalStorage();
        $scope.logout = function () {
            localStorage.clear();
            location.reload();
        };
    } catch (error) {
        console.log(error);
    }
}]);
