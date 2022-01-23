.PHONY: dist test
default: help

new:
	node scripts/bin/new.js $(filter-out $@,$(MAKECMDGOALS)) && node scripts/bin/scripts-entry.js

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake new <methods-name> \033[0m\t---  创建新组件 package. 例如 'make new funcion'"