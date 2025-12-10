#!/bin/bash
cd /home/kavia/workspace/code-generation/application-end-to-end-testing-suite-43712-43721/playwright_ui_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

