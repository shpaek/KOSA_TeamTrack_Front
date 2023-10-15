// const backURL = 'http://localhost:8080/teamtrack'
// const frontURL = 'http://localhost:5500/HTML'


$(() => {
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const selectObj = $('#monthSelect')
    // const teamNo = 9999
    
    // ---- 화면 로드시 폭죽 터지는 애니메이션 실행 START ----
    let particles = [];
    const colors = ["#fc00ff", "#00dbde",  "#fc00ff", "#00dbde"];
    function pop () {
    for (let i = 0; i < 150; i++) {
        const p = document.createElement('particule');
        p.x = window.innerWidth * 0.6;
        p.y = window.innerHeight + (Math.random() * window.innerHeight * 0.3);
        p.vel = {
        x: (Math.random() - 0.5) * 20,
        y: Math.random() * -20 - 15
        };
        p.mass = Math.random() * 0.2 + 0.8;
        particles.push(p);
        p.style.transform = `translate(${p.x}px, ${p.y}px)`;
        const size = Math.random() * 15 + 5;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = colors[Math.floor(Math.random()*colors.length)];
        document.body.appendChild(p);
    }
    }

    function render () {
    for (let i = particles.length - 1; i--; i > -1) {
        const p = particles[i];
        p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;
        
        p.x += p.vel.x;
        p.y += p.vel.y;
        
        p.vel.y += (0.7 * p.mass);
        if (p.y > (window.innerHeight * 4)) {
        p.remove();
        particles.splice(i, 1);
        }
    }
    requestAnimationFrame(render);
    }
    pop();
    window.setTimeout(render, 700);
    window.addEventListener('load', pop);
    // ---- 화면 로드시 폭죽 터지는 애니메이션 실행 END ----


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
            console.log(responseJSONObj)
            //원본 객체 찾기 
            const $originOption = $('#monthSelect>option')
            const $selectObj = $('#monthSelect')
            const uniqueMonth = new Set()
            
            responseJSONObj.forEach((element) => {
                console.log(element)
                const month = element.month
                console.log(month)

                uniqueMonth.add(month)
            })

            const uniqueMonthArray = Array.from(uniqueMonth)
            uniqueMonthArray.forEach((month) => {
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
            if (responseJSONObj == "") {
                Swal.fire({
                    icon: 'question',
                    text: '조회되는 랭킹이 없습니다'
                })
            }
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
                    
                    const $profileObj = $('<td><img class="profile" src="../images/profile.png" alt="profile">').addClass('profile').append(rdetail.profile)
                    const $nicknameObj = $('<td>').addClass('nickname').append(rdetail.nickname)
                    const $totalScoreObj = $('<td>').addClass('totalScore').append(rdetail.totalScore)
                    const $rankObj = $('<td>').addClass('rank').append(rdetail.rank)

                    $trObj.append($profileObj, $nicknameObj, $totalScoreObj, $rankObj)

                    $tbodyObj.append($trObj) 

                }
            })

        }, 
        error: () => {
            Swal.fire({
              icon: 'question',
              text: '조회되는 랭킹이 없습니다'
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

                Swal.fire({
                    title: '\n\n\n\n\n\n\n 🏆 &nbsp 이 달의 1등! &nbsp  🏆 \n'+ responseJSONObj[0].nickname +'\n',
                    width: 600,
                    padding: '3em',
                    color: '#fff',
                    background: '#FAFAD2 url(../images/congrats-gif-9.gif)',
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("../images/congrats-gom.gif")
                      right top
                      no-repeat
                    `
                })

                //'조회할 월'을 클릭하면 랭크 페이지 초기 화면으로 이동
                if (rankmonth == '0') {
                    location.href='./rank.html?teamNo='+teamNo
                }

                responseJSONObj.forEach((element) => {
                    console.log(element)

                    const $trObj = $('<tr>')
                    
                    const $profileObj = $('<td><img class="profile" src="../images/profile.png" alt="profile">').addClass('profile').append(element.profile)
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
