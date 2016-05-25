vm.calendar = {
    month: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agos', 'Set', 'Out', 'Nov', 'Dez'],
    weekDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
}

vm.calendar.dayCssClass = [];

vm.changeMonth = function(action) {
    if (action == 'next') {
        prevMonth++
        defaultMonth++
    } else {
        prevMonth--
        defaultMonth--
    }
    console.log('prevYear', prevYear);
    console.log('defaultYear', defaultYear);
    console.log('defaultMonth', defaultMonth);
    //Get total days of the previous month
    var totalDaysinPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
    console.log('totalDaysinPrevMonth', totalDaysinPrevMonth);
    //Get total days of the current month
    var totalDaysinCurrMonth = new Date(defaultYear, defaultMonth, 0).getDate();
    console.log('totalDaysinCurrMonth', totalDaysinCurrMonth);

    //get a date  in Ms for the first day of the current month
    var dateInMs = new Date(defaultYear, defaultMonth, 0).setUTCDate(1);

    //create a date object with the date in ms
    var d = new Date(dateInMs)

    //Get the weekday as a number (0-6)
    var weekDayNumber = d.getDay();
    //Case weekDayNumber is 0 (sunday)
    if (weekDayNumber == 0) {
        //go to the next week (sunday)
        weekDayNumber = 7;
    }
    //Convert the date object to string and split in an array
    var dateString = d.toDateString().split(' ')

    vm.calendar.currentMonth = dateString[1]; //stores the current month
    vm.calendar.currentYear = dateString[3]; //stores the current year
    vm.calendar.days = []; //store the days of the current month

    var j = totalDaysinPrevMonth - weekDayNumber + 1;
    var k = 1;

    for (var i = 0; i < 42; i++) {
        if (i < weekDayNumber) {
            vm.calendar.days.push(j);
            j++

        } else if (i >= weekDayNumber && i < totalDaysinCurrMonth + weekDayNumber) {
            vm.calendar.days.push(i - weekDayNumber + 1);
        } else {
            vm.calendar.days.push(k);
            k++
        }

        if (employeeWorkTrue.days[i] !== -1) {
            console.log(i);
            console.log(employeeWorkTrue.days[i]);
            vm.calendar.dayCssClass.push('work-is-true');
        } else {
            vm.calendar.dayCssClass.push('work-is-false');

        }
    }
    console.log(vm.calendar.days);


}
