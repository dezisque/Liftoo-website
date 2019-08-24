(function() {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('#'+burger.dataset.target);

  burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });
})();

$(document).ready(function(){
 $('.header-carousel').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
 });
 $('.center').slick({
  centerMode: true,
  centerPadding: '0',
  slidesToShow: 3,
  speed: 500,
  waitForAnimate: true,
  infinite: false,
  draggable: false,
  initialSlide: 3,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 1
      }
    },
  ]
});
});


var script = document.createElement('SCRIPT');
var comments = {
  user_id: [],
  name: [],
  photo:[],
  text:[]
};

script.src = "https://api.vk.com/method/board.getComments?v=5.3&access_token=576b3ad189f64f8048d3c022f15e09829fa298c198f50cc880a30cab54315b4c90d190096d92713938004&group_id=179130202&topic_id=39753597&count=5&sort=desc&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);
var cards = document.getElementsByClassName("reviews-carousel-item-h");
var cardNames = document.getElementsByClassName("reviews-carousel-item-name");
var cardReviews = document.getElementsByClassName("reviews-carousel-item-review");
console.log(cards);
function callbackFunc(result) {
  console.log(result.response);
  for (var i = 0; i < result.response.items.length; i++){
    if ((result.response.items[i].from_id != -179130202) && (result.response.items[i].text.length > 10) && (result.response.items[i].text.length < 300)){
      comments.user_id.push(result.response.items[i].from_id);
      comments.text.push(result.response.items[i].text);
      var req="https://api.vk.com/method/users.get?user_id="+comments.user_id[i]+"&v=5.52&access_token=576b3ad189f64f8048d3c022f15e09829fa298c198f50cc880a30cab54315b4c90d190096d92713938004&fields=photo_400_orig&callback=callbackFunc"
      var ind = 0;
      $.ajax({
          url : req,
          type : "GET",
          dataType : "jsonp",
          success : function(msg){
            if (msg.response.length != 0)
            {
              comments.photo.push(msg.response[0].photo_400_orig);
              comments.name.push(msg.response[0].first_name);
              cards[ind].style.backgroundImage = "url('"+comments.photo[ind]+"')";
              cardNames[ind].innerHTML = comments.name[ind];
              cardReviews[ind].innerHTML = comments.text[ind];
              cardReviews[ind].style.fontSize = 10 / comments.text[ind].length + 1.6 +'vw';
            }
            ind++;
          }
      });
    }
  }
  console.log(comments);
}
