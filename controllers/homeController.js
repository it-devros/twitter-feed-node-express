
const Promise = require('promise')
const twitterAPIs = require('../twitterApi')
const moment = require('moment')

class homeController {
  constructor () {

  }

  static renderHome (req, res) {
    res.render('index')
  }

  static getData(req, res) {
    var data1 = []
    var data2 = []
    var data3 = []
    
    Promise.resolve().then(function() {
      var params = {
        screen_name: 'MakeSchool',
        count: req.query.amount1
      }
      return twitterAPIs.getTweets(params)
    }).then(function(data) {
      data1 = data
      var params = {
        screen_name: 'newsycombinator',
        count: req.query.amount2
      }
      return twitterAPIs.getTweets(params)
    }).then(function(data) {
      data2 = data
      var params = {
        screen_name: 'ycombinator',
        count: req.query.amount3
      }
      return twitterAPIs.getTweets(params)
    }).then(function(data){
      data3 = data
      var result1 = []
      var result2 = []
      var result3 = []
      var firstDate = new Date(req.query.firstDate)
      var secondDate = new Date(req.query.secondDate)
      data1.forEach(function(item) {
        let tempDate = new Date(item.created_at)
        if (tempDate >= firstDate && tempDate <= secondDate) {
          result1.push(item)
        }
      })
      data2.forEach(function(item) {
        let tempDate = new Date(item.created_at)
        if (tempDate >= firstDate && tempDate <= secondDate) {
          result2.push(item)
        }
      })
      data3.forEach(function(item) {
        let tempDate = new Date(item.created_at)
        if (tempDate >= firstDate && tempDate <= secondDate) {
          result3.push(item)
        }
      })
      res.render('data', { data1: result1, data2: result2, data3: result3, moment: moment, color1: req.query.color1, color2: req.query.color2, color3: req.query.color3 })
    }).catch(function(err){
      console.log(err)
      res.render('error')
    })
  }


  static getDataSearch(req, res) {
    Promise.resolve().then(function() {
      var params = {
        q: req.query.search_key,
        count: req.query.amount1 + req.query.amount2 + req.query.amount3
      }
      return twitterAPIs.searchTweets(params)
    }).then(function(data){
      // console.log(data)
      res.render('search', { data: data.statuses, moment: moment, color: req.query.color1 })
    }).catch(function(err){
      console.log(err)
      res.render('error')
    })
  }

}



module.exports = homeController