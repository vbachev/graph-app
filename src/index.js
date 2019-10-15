const neo4j = require('neo4j-driver').v1

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'parola'))
const session = driver.session()

const personName = 'Alice'
const resultPromise = session.run(
  'CREATE (a:Person {name: $name}) RETURN a',
  {name: personName}
)

resultPromise.then(result => {
  session.close()

  const singleRecord = result.records[0]
  const node = singleRecord.get(0)

  console.log(node.properties.name)

  // on application exit:
  driver.close()
}).catch(err => console.log(err))
