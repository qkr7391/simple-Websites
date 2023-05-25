
    $(document).ready(function () {
        showArticles();
    });
    
    function openClose() {
        if ($("#post-box").css("display") == "block") {
            $("#post-box").hide();
            $("#btn-post-box").text("Open");
        } else {
            $("#post-box").show();
            $("#btn-post-box").text("Close");
        }
    }
    
    function postArticle() {
        let url = $('#post-url').val()
        let comment = $('#post-comment').val()
    
        $.ajax({
            type: "POST",
            url: "/memo",
            data: {url_give: url, comment_give: comment},
            success: function (response) {
                alert(response["msg"]);
                window.location.reload()
            }
        })
    }
    
    function showArticles() {
        $.ajax({
            type: "GET",
            url: "/memo",
            data: {},
            success: function (response) {
                let articles = response['all_articles']
                for (let i = 0; i < articles.length; i++) {
                    let title = articles[i]['title']
                    let image = articles[i]['image']
                    let url = articles[i]['url']
                    let desc = articles[i]['desc']
                    let comment = articles[i]['comment']
    
                    let temp_html = `<div class="card">
                                        <img class="card-img-top"
                                            src="${image}"
                                            alt="Card image cap">
                                        <div class="card-body">
                                        <a target="_blank" href="${url}" class="card-title">${title}</a>
                                        <p class="card-text">${desc}</p>
                                        <p class="card-text comment">${comment}</p>
                                        </div>
                                    </div>`
                    $('#cards-box').append(temp_html)
                }
            }
        })
    }
