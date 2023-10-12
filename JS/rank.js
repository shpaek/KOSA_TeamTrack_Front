const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/KOSA_Project2_Front/HTML/'

$(() => {
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const selectObj = $('#monthSelect')
    // const teamNo = 9999
    
    //---- 팀 내 개인랭킹 클릭했을 때 발생할 일 START ----
    // 1. select box에 팀에 있는 월들만 표시되도록 실행
    $.ajax({
        xhrFields: {
            withCredentials: true 
        },
        url: backURL + '/selectmonth',
        method: 'get',
        data: `teamNo=${teamNo}`,
        success: (responseJSONObj) => { //응답데이터 전달
            
            //원본 객체 찾기 
            const $originOption = $('#monthSelect>option')
            const $selectObj = $('#monthSelect')
            
            responseJSONObj.forEach((element) => {
                console.log(element)
                const month = element.month
                console.log(month)
                //복제본
                const $copyOption = $originOption.clone()
                $copyOption.empty()
                //month객체 담아주기
                const $monthObj = $(`<option value=${month}>${month}월</option>`).addClass('month');
                $selectObj.append($monthObj)
            })
        }
    })


    // 2. 테이블에 현재 월 기준 랭킹을 조회하도록 실행
    $.ajax({
        xhrFields: {
            withCredentials: true 
        },
        url: backURL + '/rank',
        method: 'get',
        data: `teamNo=${teamNo}`,
        success: (responseJSONObj) => { //응답데이터 전달

            //원본 ranklist객체 찾기
            const $originRank = $('div.memberRank>table>thead>tr')
            const $tbodyObj = $('div.memberRank>table>tbody') //tbody객체 <-여기에 복사본 넣어줄 예정

            responseJSONObj.forEach((element) => {
                console.log(element) //rankmap 전체 출력
                
                //복제본 ranklist객체 생성
                const $copyRank = $originRank.clone()
                $copyRank.empty()

                // const r = element.rankmap //랭킹 정보
                // console.log(r) //rankmap 안에 key:value 세트 전체 출력
                
                for (var key in element) {
                    console.log(key)
                    console.log(key, element[key]) //각 key와 value 출력
                    const rdetail = element[key]

                    console.log(rdetail.id, rdetail.nickname, rdetail.totalScore, rdetail.rank)

                    const $trObj = $('<tr>')
                    
                    const $profileObj = $('<td>').addClass('profile').append(rdetail.profile)
                    const $nicknameObj = $('<td>').addClass('nickname').append(rdetail.nickname)
                    const $totalScoreObj = $('<td>').addClass('totalScore').append(rdetail.totalScore)
                    const $rankObj = $('<td>').addClass('rank').append(rdetail.rank)

                    $trObj.append($profileObj, $nicknameObj, $totalScoreObj, $rankObj)

                    $tbodyObj.append($trObj) 

                }
            })
        }
    })
    //---- 팀 내 개인랭킹 클릭했을 때 발생할 일 END ----

    //---- select박스에서 월 선택하는 change 이벤트가 발생했을 때 할 일 START ----
    selectObj.change(() => {
        const rankmonth = $('#monthSelect').val();
        console.log(rankmonth);

        $.ajax({
            xhrFields: {
                withCredentials: true 
            },
            url: backURL + '/rankjson',
            method: 'get',
            data: `teamNo=${teamNo}&month=${rankmonth}`,
            success: (responseJSONObj) => {
                console.log(responseJSONObj)
                const $tbodyObj = $('div.memberRank>table>tbody')
                $tbodyObj.empty()

                //'조회할 월'을 클릭하면 랭크 페이지 초기 화면으로 이동
                if (rankmonth == '0') {
                    location.href='./rank.html?teamNo='+teamNo
                }

                responseJSONObj.forEach((element) => {
                    console.log(element)

                    const $trObj = $('<tr>')
                    
                    const $profileObj = $('<td>').addClass('profile').append(element.profile)
                    const $nicknameObj = $('<td>').addClass('nickname').append(element.nickname)
                    const $totalScoreObj = $('<td>').addClass('totalScore').append(element.totalScore)
                    const $rankObj = $('<td>').addClass('rank').append(element.rank)

                    $trObj.append($profileObj, $nicknameObj, $totalScoreObj, $rankObj)

                    $tbodyObj.append($trObj)
                })
            }
        })
    })
    //---- select박스에서 월 선택하는 change 이벤트가 발생했을 때 할 일 END ----

})