const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/KOSA_Project2_Front/HTML/'

$(() => {
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    // const teamNo = 9999
    
    //팀내 개인랭킹 클릭했을 때 랭킹 목록 실행
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

                const r = element.rankmap //랭킹 정보
                console.log(r) //rankmap 안에 key:value 세트 전체 출력
                
                for (var key in r) {
                    console.log(key, r[key]) //각 key와 value 출력
                    const rdetail = r[key]
                    
                    
                    rdetail.forEach((item) => { //각 value의 요소들 출력
                        console.log(item.id, item.nickname, item.totalScore, item.rank)
                        rdetail.sort((a,b) => {
                            return (a.rank - b.rank)
                        })

                        const $trObj = $('<tr>')
                        
                        const $profileObj = $('<td>').addClass('profile').append(item.profile)
                        const $nicknameObj = $('<td>').addClass('nickname').append(item.nickname)
                        const $totalScoreObj = $('<td>').addClass('totalScore').append(item.totalScore)
                        const $rankObj = $('<td>').addClass('rank').append(item.rank)

                        $trObj.append($profileObj, $nicknameObj, $totalScoreObj, $rankObj)

                        $tbodyObj.append($trObj)                        
                    })

                }
            })

        }

    })

})