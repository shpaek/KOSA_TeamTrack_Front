$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/alltasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }
            const $originTrObj = $('div.allboard>div.allcontent>table>thead>tr')
            const $tbodyObj = $('div.allboard>div.allcontent>table>tbody')
            
            responseJSONObj.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.id
                const r = element.regdate
                
                const $prodNoTdObj = $('<td>')
                $prodNoTdObj.addClass('title')
                $prodNoTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $prodNameTdObj = $('<td>')
                $prodNameTdObj.addClass('id')
                $prodNameTdObj.append(q)                
                $copyTrObj.append($idTdObj)  

                const $prodPriceTdObj = $('<td>')
                $prodPriceTdObj.addClass('regdate')
                $prodPriceTdObj.append(r)
                $copyTrObj.append($regdateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            const $totalTdObj = $('<td>')

            $totalTdObj.attr('colspan', 4).css({"text-align":"right", 'font-weight' : 'bold'})
            //$totalTdObj.append('총 상품목록 : '+ responseJSONObj.length + "개, 총 가격:" + totalPrice +"원") 
            $copyTrObj.append($totalTdObj)
            $tbodyObj.append($copyTrObj)

        }
    })
})