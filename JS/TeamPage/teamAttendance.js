$(document).ready(function() {
    buildCalendar();
    $("td:contains('&#60;')").click(prevCalendar);  // 이전달 버튼 클릭 이벤트 연결
    $("td:contains('&#62;')").click(nextCalendar);  // 다음달 버튼 클릭 이벤트 연결
});

let nowMonth = new Date();
let today = new Date();
today.setHours(0, 0, 0, 0);

function buildCalendar() {
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);

    let tbodyCalendar = $(".teamCalendar > tbody");
    $("#calYear").text(nowMonth.getFullYear());
    $("#calMonth").text(leftPad(nowMonth.getMonth() + 1));

    tbodyCalendar.empty();

    let nowRow = $('<tr>').appendTo(tbodyCalendar);

    for (let j = 0; j < firstDate.getDay(); j++) {
        nowRow.append('<td>');
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {
        let nowColumn = $('<td>').text(leftPad(nowDay.getDate())).appendTo(nowRow);

        if (nowDay.getDay() == 0) {
            nowColumn.css("color", "#DC143C");
        }

        if (nowDay.getDay() == 6) {
            nowColumn.css("color", "#0000CD");
            nowRow = $('<tr>').appendTo(tbodyCalendar);
        }

        if (nowDay < today) {
            nowColumn.addClass("pastDay");
        } else if (nowDay.getTime() === today.getTime()) {
            nowColumn.addClass("today").click(function() {
                choiceDate($(this));
            });
        } else {
            nowColumn.addClass("futureDay").click(function() {
                choiceDate($(this));
            });
        }
    }
}

function choiceDate(nowColumn) {
    let choiceDay = $(".choiceDay");
    if (choiceDay.length) {
        choiceDay.removeClass("choiceDay");
    }
    nowColumn.addClass("choiceDay");
}

function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());
    buildCalendar();
}

function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());
    buildCalendar();
}

function leftPad(value) {
    return value < 10 ? "0" + value : value.toString();
}

