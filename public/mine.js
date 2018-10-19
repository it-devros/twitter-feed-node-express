

$(document).ready(function () {


  var heightWithoutNavbar = $("body > #wrapper").height();
  $(".settings-panel").css("min-height", heightWithoutNavbar + "px");

  $('#collaps_btn').click(function() {
    $('#settings_mine').toggleClass('showed-settings').toggleClass('hiden-settings');
    $('#irs-1').toggleClass('showed-settings').toggleClass('hiden-settings');
    $('#datepicker').toggleClass('showed-settings-table').toggleClass('hiden-settings');
  });

  $('#page-wrapper').click(function() {
    $('#settings_mine').removeClass('hiden-settings');
  });

  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 5);
  var secondDate = new Date();

  if (localStorage.getItem('firstDate')) {
    firstDate = localStorage.getItem('firstDate');
    firstDate = new Date(firstDate);
  }
  if (localStorage.getItem('secondDate')) {
    secondDate = localStorage.getItem('secondDate');
    secondDate = new Date(secondDate);
  }


  var firstMonth = firstDate.getMonth() + 1;
  var secondMonth = secondDate.getMonth() + 1;
  var firstDate_str = firstMonth + '/' + firstDate.getDate() + '/' + firstDate.getFullYear();
  var secondDate_str = secondMonth + '/' + secondDate.getDate() + '/' + secondDate.getFullYear();
  $('#firstDate').val(firstDate_str);
  $('#secondDate').val(secondDate_str);

  $('#hi_firstDate').val(firstDate_str);
  $('#hi_secondDate').val(secondDate_str);

  $('#data_5 .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true
  });

  $('.demo1').colorpicker();
  $('#irs-1').addClass('hiden-settings');
  $('#datepicker').addClass('hiden-settings');

  var amount1 = 2;
  var amount2 = 2;
  var amount3 = 2;

  var color1 = '#1ab394';
  var color2 = '#1c84c6';
  var color3 = '#ed5565';

  if (localStorage.getItem('amount1')) {
    amount1 = localStorage.getItem('amount1')
  }
  if (localStorage.getItem('amount2')) {
    amount2 = localStorage.getItem('amount2')
  }
  if (localStorage.getItem('amount3')) {
    amount3 = localStorage.getItem('amount3')
  }

  if (localStorage.getItem('color1')) {
    color1 = localStorage.getItem('color1');
  }
  if (localStorage.getItem('color2')) {
    color2 = localStorage.getItem('color2');
  }
  if (localStorage.getItem('color3')) {
    color3 = localStorage.getItem('color3');
  }


  $('#amount1').val(amount1);
  $('#amount2').val(amount2);
  $('#amount3').val(amount3);

  $('#hi_amount1').val(amount1);
  $('#hi_amount2').val(amount2);
  $('#hi_amount3').val(amount3);

  $('#color1').val(color1);
  $('#color2').val(color2);
  $('#color3').val(color3);

  $('#hi_color1').val(color1);
  $('#hi_color2').val(color2);
  $('#hi_color3').val(color3);


  if (localStorage.getItem('search_key')) {
    var search_key = '';
    search_key = localStorage.getItem('search_key');
    $('#search_key').val(search_key);
    localStorage.removeItem('search_key');
    $.get(
      "/search",
      {
        firstDate: firstDate,
        secondDate: secondDate,
        amount1: amount1,
        amount2: amount2,
        amount3: amount3,
        color1: color1,
        color2: color2,
        color3: color3,
        search_key: search_key
      },
      function(data, status){
        if (status == 'success') {
          $('#content').html(data);
          $("#ibox_1").draggable();
        }
    });
  } else {
    $.get(
      "/getData",
      {
        firstDate: firstDate,
        secondDate: secondDate,
        amount1: amount1,
        amount2: amount2,
        amount3: amount3,
        color1: color1,
        color2: color2,
        color3: color3 
      },
      function(data, status){
        if (status == 'success') {
          $('#content').html(data);
          var heightWithoutNavbar = $("body > #wrapper").height();
          $(".settings-panel").css("min-height", heightWithoutNavbar + "px");
        }
    });
  }

  $(window).resize(() => {
    var heightWithoutNavbar = $("body > #wrapper").height();
    $(".settings-panel").css("min-height", heightWithoutNavbar + "px");
  });


  $('#btn_reset').click(function() {
    initData();
  });

  $('#btn_save').click(function() {
    var firstDateStr = $('#firstDate').val();
    var secondDateStr = $('#secondDate').val();
    var firstDate = new Date(firstDateStr);
    var secondDate = new Date(secondDateStr);

    var amount1 = $('#amount1').val();
    var amount2 = $('#amount2').val();
    var amount3 = $('#amount3').val();

    var color1 = $('#color1').val();
    var color2 = $('#color2').val();
    var color3 = $('#color3').val();

    if (amount1 < 3200 && amount2 < 3200 && amount3 < 3200) {
      localStorage.setItem('firstDate', firstDate);
      localStorage.setItem('secondDate', secondDate);

      localStorage.setItem('amount1', amount1);
      localStorage.setItem('amount2', amount2);
      localStorage.setItem('amount3', amount3);

      localStorage.setItem('color1', color1);
      localStorage.setItem('color2', color2);
      localStorage.setItem('color3', color3);

      $('#hi_firstDate').val(firstDateStr);
      $('#hi_secondDate').val(secondDateStr);

      $('#hi_amount1').val(amount1);
      $('#hi_amount2').val(amount2);
      $('#hi_amount3').val(amount3);

      $('#hi_color1').val(color1);
      $('#hi_color2').val(color2);
      $('#hi_color3').val(color3);
      
      $.get(
        "/getData",
        {
          firstDate: firstDate,
          secondDate: secondDate,
          amount1: amount1,
          amount2: amount2,
          amount3: amount3,
          color1: color1,
          color2: color2,
          color3: color3,
        },
        function(data, status){
          if (status == 'success') {
            $('#content').html(data);
            $("#ibox_1").draggable();
          }
      });

    } else {
      alert('Numbers must be low than 3200.');
    }

  });



  $('#search_form').submit(function() {
    var search_key = $('#search_key').val();
    localStorage.setItem('search_key', search_key);
  });



  function initData() {

    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);
    var secondDate = new Date();

    if (localStorage.getItem('firstDate')) {
      firstDate = localStorage.getItem('firstDate');
      firstDate = new Date(firstDate);
    }
    if (localStorage.getItem('secondDate')) {
      secondDate = localStorage.getItem('secondDate');
      secondDate = new Date(secondDate);
    }

    var firstMonth = firstDate.getMonth() + 1;
    var secondMonth = secondDate.getMonth() + 1;
    var firstDate_str = firstMonth + '/' + firstDate.getDate() + '/' + firstDate.getFullYear();
    var secondDate_str = secondMonth + '/' + secondDate.getDate() + '/' + secondDate.getFullYear();
    $('#firstDate').val(firstDate_str);
    $('#secondDate').val(secondDate_str);

    $('#hi_firstDate').val(firstDate_str);
    $('#hi_secondDate').val(secondDate_str);

    $('#data_5 .input-daterange').datepicker({
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true
    });

    var amount1 = 2;
    var amount2 = 2;
    var amount3 = 2;

    var color1 = '#1ab394';
    var color2 = '#1c84c6';
    var color3 = '#ed5565';

    if (localStorage.getItem('amount1')) {
      amount1 = localStorage.getItem('amount1')
    }
    if (localStorage.getItem('amount2')) {
      amount2 = localStorage.getItem('amount2')
    }
    if (localStorage.getItem('amount3')) {
      amount3 = localStorage.getItem('amount3')
    }

    if (localStorage.getItem('color1')) {
      color1 = localStorage.getItem('color1');
    }
    if (localStorage.getItem('color2')) {
      color2 = localStorage.getItem('color2');
    }
    if (localStorage.getItem('color3')) {
      color3 = localStorage.getItem('color3');
    }

    $('#amount1').val(amount1);
    $('#amount2').val(amount2);
    $('#amount3').val(amount3);

    $('#hi_amount1').val(amount1);
    $('#hi_amount2').val(amount2);
    $('#hi_amount3').val(amount3);

    $('#color1').val(color1);
    $('#color2').val(color2);
    $('#color3').val(color3);

    $('#hi_color1').val(color1);
    $('#hi_color2').val(color2);
    $('#hi_color3').val(color3);


  }


});