'use strict'
assert = require('assert')
Crate = require('../index.js')
spawn = require('child_process').spawn

describe 'crate', ->
  client = undefined
  before (done) ->
    client = new Crate(['localhost:4200' ])
    done()

  after (done) ->
    # return done()
    client.exec "drop table if exists demo", done

  # test cases
  describe 'create table', ->
    it 'call without args', (done) ->
      client.exec "
          create table if not exists demo (
            name string,
            obj object (dynamic) as (
                age int
            ),
            tags array (string)
          )
        ", (err, results, data) ->
          assert.equal(200, results)
          assert.equal(1, data.rowcount)
          done()

  describe 'insert into table', ->
    it 'another call without args', (done) ->
      client.exec "
        insert into demo (name, obj, tags) values
        ('Trillian',{age = 39, gender='female'},['mathematician', 'astrophysicist'])
      ", (err, results, data) ->
        assert.equal(200, results)
        assert.equal(1, data.rowcount)
        done()
    it 'insert with args', (done) ->
      client.query "insert into demo (name, obj, tags) values (?,?,?)"
      , ['Trillian1',{age : 3, gender:'male'},['teacher']]
      , (err, results, data) ->
        assert.equal(200, results)
        assert.equal(1, data.rowcount)
        done()

    it 'give some time to crate to process inserts', (done)->
      setTimeout done, 1500

  describe "query results", ->
    it 'query without args', (done) ->
        client.exec "select * from demo"
        , (err, results, data) ->
          assert.equal(200, results)
          assert.equal(2, data.rowcount)
          done()
    it 'query with args', (done) ->
        client.query "select * from demo"
        , ['female']
        , (err, results, data) ->
          assert.equal(200, results)
          assert.equal(2, data.rowcount)
          done()
