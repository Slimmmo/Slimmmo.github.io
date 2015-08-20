# Slimmmo.github.io

Simple [AdVenture Capitalist](http://store.steampowered.com/app/346900/) calculator using averages not cycle time.
Made with [AngularJS](http://angularjs.org/), [Bootstrap](http://getbootstrap.com/), [ui-bootstrap](https://angular-ui.github.io/bootstrap/), and [Font-Awesome](http://fortawesome.github.io/Font-Awesome/).

Please let me know if:
- you find any errors; and include as much information as possible for me to try to re-create it so I can fix it. If a calculation is off by a small amount, such as Lemons is saying 1.224 Billion / cycle instead of 1.223 Billion / cycle, then please just ignore it and don't let me know as it is either a rounding error or an error since number of angels is not exactly correct (rounding in game).
- you think there is a more appropriate Upgrade Score calculation.
- you would like any other additional features, such as showing when Angel Upgrades are worth purchasing.

### Notes:
- Remember to manually check number of angels after each angel purchase. It's not intuitive yet.
- Moon calculations don't work because I don't have have the unlocks table for all businesses. Will be fixed when I make it to the moon (~30th August).

### To Do:
- Implement cycle time increments instead of averages to make the saving time calculations more accurate.
- Incorporate [BigNumber](https://github.com/MikeMcl/bignumber.js) to make decimal calculations accurate.
- Add the managers that reduce unlock cost of businesses to recommendations.
- Add a way to play out a user-defined strategy and provide detailed information.
- Add a way to compare strategies.
- Implement Simulate function from dev.
- Add a way to change number of steps in the Simulate function.
- Add ability to type in angel numbers (7.02 Quintillion, etc).
- Add ability to re-order tables by clicking on table head.
