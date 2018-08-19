(function (module) {

    module.controller("MainController", myController);
    myController.$inject = ["appValues"];
    function myController(appValues) {
        var self = this;
        var today = new Date();

        self.sprintDefine = appValues.sprintDefine;

        var currentSprint = getCurrentSprint(today, appValues.sprintDefine);

        self.sprintActivities = buildSprintActivities(currentSprint, appValues);
    }

    function getCurrentSprint(today, sprintDefine) {
        return _.find(sprintDefine, function (item) {
            return item.from <= today <= item.to;
        });
    }

    function buildSprintActivities(currentSprint) {
        var sprintDays = [];
        var start = moment(currentSprint.from);
        while (start <= currentSprint.to) {
            if (moment(start).day() !== 0 && moment(start).day() !== 6) sprintDays.push(start);
            start = moment(start).add(1, "days");
        }

        return _.map(sprintDays, function(item) {
            return {
                date: item,
                title: item.format("DD/MM"),
                content: "Lorem ipsum dolor sit amet"
            }
        });
    }
})(angular.module("myApp"));

