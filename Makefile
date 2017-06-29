MOCHA_COV=./node_modules/.bin/_mocha
MOCHA=./node_modules/.bin/mocha
ISTANBUL=./node_modules/.bin/istanbul

ENVIRONMENT_VARIABLES = NODE_ENV=unittest

cov:
	@$(ENVIRONMENT_VARIABLES) \
	$(ISTANBUL) cover $(MOCHA_COV) -- --recursive -R spec -t 15000 test

test:
	@$(ENVIRONMENT_VARIABLES) \
	$(MOCHA) --recursive -R spec -t 15000 test

.PHONY: cov test
