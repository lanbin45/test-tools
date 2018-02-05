

@echo off
pushd %~dp0

set SOURCE_DIST=.\dist
set TARGET_DIST=..\server\dist

REM COPY

call ng build --prod --no-extract-licenses

if exist %SOURCE_DIST% (
robocopy /E /NFL /NDL /NP  %SOURCE_DIST% %TARGET_DIST%
)

popd

pause