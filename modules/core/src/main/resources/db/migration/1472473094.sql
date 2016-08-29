let DashboardClass = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'Dashboard';

if ($DashboardClass.size() == 0) {
  console.log "Dashboard class not exists! Start creating process."

  CREATE Class DashboardClass
  CREATE PROPERTY DashboardClass.user LINKSET
  CREATE PROPERTY DashboardClass.link LINKSET
  CREATE PROPERTY DashboardClass.size INTEGER
  CREATE PROPERTY DashboardClass.order INTEGER

  ALTER PROPERTY DashboardClass.user MANDATORY true
  ALTER PROPERTY DashboardClass.link MANDATORY true
  ALTER PROPERTY DashboardClass.size MANDATORY true
  ALTER PROPERTY DashboardClass.order MANDATORY true

  console.log "Creating process for DashboardClass class is done."
}

let DashboardTypeClass = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'DashboardType';

if ($DashboardTypeClass.size() == 0) {
  console.log "DashboardTypeClass class not exists! Start creating process."

  CREATE Class DashboardTypeClass

  CREATE PROPERTY DashboardTypeClass.name STRING
  CREATE PROPERTY DashboardTypeClass.code STRING
  CREATE PROPERTY DashboardTypeClass.codeLanguage STRING

  ALTER PROPERTY DashboardTypeClass.name MANDATORY true
  ALTER PROPERTY DashboardTypeClass.code MANDATORY true
  ALTER PROPERTY DashboardTypeClass.codeLanguage CUSTOM type='SQL,JavaScript'

  console.log "Creating process for DashboardTypeClass class is done."
}

return true

