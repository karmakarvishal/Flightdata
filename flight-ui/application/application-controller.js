/* eslint-disable*/
const app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', 'flightDataFactory', function ($scope, flightDataFactory) {
    $('#myModal').modal('show');
    $('#myModal').modal('hide');
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
    const populateTable = (flights) => {
        for (const flight of flights) {
            const tableRow = document.createElement('tr');
            const tableIcon = document.createElement('td');
            tableIcon.textContent = '✈';
            tableRow.append(tableIcon);

            const flightDetails = {
                time: ($scope.flightUiEditObject.selectedArrDepType === 'departures') ? flight.arr_time : flight.dep_time,
                destination: ($scope.flightUiEditObject.selectedArrDepType === 'departures') ? flight.dep_iata.toUpperCase() : flight.arr_iata.toUpperCase(),
                flight: flight.flight_number.toUpperCase(),
                gate: ($scope.flightUiEditObject.selectedArrDepType === 'departures') ? flight.dep_gate : flight.arr_gate,
                remarks: flight.status.toUpperCase(),
            };
            $scope.flightUiEditObject.arrDepFlightsData.push(flightDetails);
            // for (const flightDetail in flightDetails) {
            //     const tableCell = document.createElement('td')
            //     const word = Array.from(flightDetails[flightDetail])

            //     for (const [index, letter] of word.entries()) {
            //         const letterElement = document.createElement('div')

            //         setTimeout(() => {
            //             letterElement.classList.add('flip')
            //             letterElement.textContent = letter
            //             tableCell.append(letterElement)
            //         }, 100 * index)
            //     }
            //     tableRow.append(tableCell)
            // }
            // tableBody.append(tableRow)
        }
    };
    $scope.screens = {
        login: true,
        flight: false,
    };
    $scope.userFlightTableScreen = {
        user: false,
        flight: true,
    };
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
    };

    function getAllUsers() {
        flightDataFactory.getAllUsers()
            .then(function (result) {
                if (result) {
                    $scope.flightUiEditObject.usersList = result;
                    console.log($scope.flightUiEditObject.usersList);
                }
            }).catch(function (ex) {
                console.log('ex: ', ex);
            });
    }

    flightDataFactory.getUserTypes()
        .then(function (result) {
            if (result) {
                $scope.flightUiEditObject.userTypes = result;
            }
            getAllUsers();
        }).catch(function (ex) {
            console.log('ex: ', ex);
        });

    $scope.signUp = function () {
        if ($scope.flightUiEditObject.registerUser) {
            flightDataFactory.registerUser($scope.flightUiEditObject.registerUser)
                .then(function (result) {
                    console.log('registerUser: ', result);
                    getAllUsers();
                    container.classList.remove('right-panel-active');
                })
                .catch(function (ex) {
                    console.log(ex);
                });
        }
    };

    function getFlightsData() {
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
                    console.log($('#flight-select-ctn'));
                    $('#flight-select-ctn').append(selectHtml);
                    $('.selectpicker').selectpicker('refresh');
                    $scope.flightUiEditObject.selectedArrDepType = $scope.flightUiEditObject.arrDepType[0];
                    $scope.flightUiEditObject.selectedDelayTimings = $scope.flightUiEditObject.delayTimings[0];
                }
            }).catch(function (ex) {
                console.log('ex: ', ex);
            });
    }

    $scope.flightDataChanged = function () {
        const obj = {
            endpoint: 'delays',
            type: $scope.flightUiEditObject.selectedArrDepType,
            delay: String($scope.flightUiEditObject.selectedDelayTimings),
            airline_icao: ($('#flight-select-picker').find(':selected').attr('data-icao_code')) ? $('#flight-select-picker').find(':selected').attr('data-icao_code') : '',
            airline_iata: ($('#flight-select-picker').find(':selected').attr('data-iata_code')) ? $('#flight-select-picker').find(':selected').attr('data-iata_code') : '',
        };
        console.log(obj);
        flightDataFactory.getDelaysData(obj)
            .then(function (result) {
                $scope.flightUiEditObject.populateTable = [];
                console.log('getDelaysData: ', result);
                if (result.length > 0) {
                    populateTable(result);
                }
            })
            .catch(function (ex) {
                console.log(ex);
            });
    };

    $(document).on('change', '#flight-select-picker', function () {
        $scope.flightDataChanged();
        // $scope.flightUiEditObject.selectedFlight = {
        //     endpoint: "flight",
        //     iata_code: ($('#flight-select-picker').find(":selected").attr('data-iata_code')) ? $('#flight-select-picker').find(":selected").attr('data-iata_code') : "",
        //     icao_code: ($('#flight-select-picker').find(":selected").attr('data-icao_code')) ? $('#flight-select-picker').find(":selected").attr('data-icao_code') : ""
        // };
        // if ($scope.flightUiEditObject.selectedFlight) {
        //     console.log($scope.flightUiEditObject.selectedFlight);
        //     flightDataFactory.getFlightsDetails($scope.flightUiEditObject.selectedFlight)
        //         .then(function (result) {
        //             console.log("selected flight result: ", result);
        //         })
        //         .catch(function (ex) {
        //             console.log(ex);
        //         });
        // }
    });

    $scope.signIn = function () {
        if ($scope.flightUiEditObject.loginUser) {
            for (let index = 0; index < $scope.flightUiEditObject.usersList.length; index++) {
                if (($scope.flightUiEditObject.usersList[index].email.toLowerCase() == $scope.flightUiEditObject.loginUser.email.toLowerCase()) && ($scope.flightUiEditObject.usersList[index].pass == $scope.flightUiEditObject.loginUser.password)) {
                    // show flight data screen
                    $scope.flightUiEditObject.currentLoggedInUser = $scope.flightUiEditObject.usersList[index];
                    $scope.screens.login = false;
                    $scope.screens.flight = true;
                    getFlightsData();
                    // populateTable($scope.flights);
                    break;
                }
            }
        }
    };
    $scope.displayUsers = function () {
        $scope.userFlightTableScreen.flight = false;
        $scope.userFlightTableScreen.user = true;
    };
    $scope.displayFlights = function () {
        $scope.userFlightTableScreen.flight = true;
        $scope.userFlightTableScreen.user = false;
    };
    $scope.deleteUser = function (user) {
        flightDataFactory.deleteUser(user.id)
            .then(function (result) {
                console.log(result);
                getAllUsers();
            })
            .catch(function (ex) {
                console.log(ex);
            });
    };
}]);