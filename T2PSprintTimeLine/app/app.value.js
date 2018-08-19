(function (module) {



    module.value("appValues", appValues());

    function appValues() {
        var deliveryDates = [
            new Date(2018, 07, 22),
            new Date(2018, 08, 05),
            new Date(2018, 08, 19),
            new Date(2018, 09, 03),
            new Date(2018, 09, 17),
            new Date(2018, 09, 31)
        ];


        var sprintDefine = buildSprintDates(deliveryDates);

        /*
        Sunday: 0,
        Monday: 1
        ...
        Satuday: 6
         */
        var sprintActivityDefine = [
            {
                day: [1, 2, 3, 4, 5],
                content: "Work for this sprint"
            },
            {
                day: [1, 2, 3],
                week: 2,
                content: "Work for sprint {0}"
            },
            {
                day: [3],
                week: 2,
                content: "Planning for print {0}"
            },
            {
                day: [4, 5],
                week: 2,
                content: "Fix bug this sprint"
            }
        ];

        return {
            sprintDefine: sprintDefine
        }
    }

    function buildSprintDates(deliveryDates) {
        return _.map(deliveryDates, function (item) {
            var momentDate = moment(item);
            var start = moment(item).subtract(2, "weeks").startOf("week").add(1, "days");
            var end = moment(item).subtract(1, "weeks").endOf("week").subtract(1, "days");

            return {
                title: momentDate.format("YYYYMMDD"),
                date: item,
                from: start,
                to: end
            }
        });
    }
})(angular.module("myApp"))