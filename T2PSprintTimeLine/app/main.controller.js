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

    function buildSprintActivities(currentSprint, appValues) {
        var activityDefine = appValues.sprintActivityDefine;
        var sprintDays = [];
        var start = moment(currentSprint.from);
        while (start <= currentSprint.to) {
            if (moment(start).day() !== 0 && moment(start).day() !== 6) sprintDays.push(start);
            start = moment(start).add(1, "days");
        }

        return _.map(sprintDays, function (item) {
            var week = currentSprint.from <= item && item <= currentSprint.endWeek1 ? 1 : 2;
            var weekDay = moment(item).day();
            var content = _.find(activityDefine, function (activity) {
                return activity.week === week && activity.day.indexOf(weekDay) > -1;

            }).content;
            return {
                date: item,
                title: item.format("DD/MM"),
                content: content
            }
        });
    }
})(angular.module("myApp"));

