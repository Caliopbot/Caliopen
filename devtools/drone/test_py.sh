#!/bin/bash
set -e

if [ "$SRC_CHANGED" = "false" ];
then
	echo "No changes to backend"
	return
fi

cd src/backend
pip install main/py.storage components/py.pgp components/py.pi main/py.main interfaces/REST/py.server 
pip install interfaces/NATS/py.client tools/py.CLI tools/py.doc
pip install ipdb docker-compose gitpython nose
nosetests -sv main/py.main/caliopen_main/tests
nosetests -sv components/py.pi/caliopen_pi/tests
