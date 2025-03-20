import {GoldToken} from "./GoldToken.sol";

contract TestableGoldToken is GoldToken {
    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
