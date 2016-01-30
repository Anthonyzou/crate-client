'use strict'
assert = require('assert')
Crate = require('../index.js')
spawn = require('child_process').spawn

describe 'crate', ->
  client = undefined
  before ->
    client = new Crate(['localhost:4200' ])
    return


  # test cases
  describe 'create table', ->
    it 'call without args', (done) ->
      client.exec "
          create if exists table demo (
            name string,
            obj object (dynamic) as (
                age int
            ),
            tags array (string)
          )
        ", (err, results, data) ->
          done()


  describe 'create table', ->
    it 'another call without args', (done) ->
      client.exec "
        insert into demo (name, obj, tags) values
        ('Trillian',{age = 39, gender='female'},['mathematician', 'astrophysicist'])
      ", (err, results, data) ->
        done()

  describe 'create table', ->
    it 'another call without args', (done) ->
      client.exec "
        insert into demo (name, obj, tags) values
        ('Trillian',{age = 39, gender='female'},['mathematician', 'astrophysicist'])
      ", (err, results, data) ->
        done()
