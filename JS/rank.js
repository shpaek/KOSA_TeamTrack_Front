$(() => {

    //팀내 개인랭킹 클릭했을 때 랭킹 목록 실행
    $.ajax({
        xhrFields: {
            withCredentials: true 
        },
        url: backURL + '/rank',
        method: 'get',
        success: (responseJSONObj) => { //응답데이터 전달

            const list = responseJSONObj.list
            console.log(list)
            
            //원본 cartlist객체 찾기
            const $originRank = $('div.memberRank>table>thead>tr')
            const $tbodyObj = $('div.memberRank>table>tbody') //tbody객체 <-여기에 복사본 넣어줄 예정
            //let totalPrice = 0;

            responseJSONObj.forEach((element) => {
                console.log(element)
                
                //복제본 cartlist객체 생성
                const $copyRank = $originRank.clone()
                $copyRank.empty()

                const r = element.rank //랭킹 정보

                const $profileObj = $('<td>')
                $profileObj.addClass('profile')
                $profileObj.append(r.profile) //td객체의 하위노드 추가
                $copyRank.append($profileObj) //복제본에 td 객체 추가

                const $nicknameObj = $('<td>')
                $nicknameObj.addClass('nickname')
                $nicknameObj.append(r.nickname)
                $copyRank.append($nicknameObj)

                const $totalScoreObj = $('<td>')
                $totalScoreObj.addClass('totalscore')
                $totalScoreObj.append(r.totalScore)
                $copyRank.append($totalScoreObj)
                
                const $rankObj = $('<td>')
                $rankObj.addClass('rank')
                $rankObj.append(r.rank)
                $copyRank.append($rankObj)

                $tbodyObj.append($copyRank)
            })

            // const $copyRank = $originRank.clone()
            // $copyRank.empty()
            // const $totalTdObj = $('<td>')
            // $totalTdObj.attr('colspan', 4).css({"text-align":"right", "font-weight":"bold"})
            // $totalTdObj.append('총 상품목록: ' + responseJSONObj.length + '개, 총 가격: ' + totalPrice + "원")

            // $copyCart.append($totalTdObj)
            // $tbodyObj.append($copyCart)

            //원본 객체는 숨기기
            // $originCart.hide()

            // const $cartList = $('div.cartlist')

            // for (let i = 0; i<list; i++) {
            //     let table = `<th><td>${prodNo}</td></th>`
            //     $cartList.html($cartList.html())
            // }
        }

    })

})