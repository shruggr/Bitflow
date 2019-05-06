using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.UI;

public class WalletFooterUI : MonoBehaviour
{
    [SerializeField] Text WalletAddress;
    [SerializeField] Text WalletFunds;

    async void Start()
    {
        while ( Authenticator.Instance == null || Authenticator.Instance.Identity == null )
        {
            await Task.Delay( 200 );
        }

        WalletAddress.text = $"Address: {Authenticator.Instance.Identity.Address}";
        BitIndexUtils.QueryAddressDetails( Authenticator.Instance.Identity.Address,
            details => { WalletFunds.text = $"Funds: {details.Balance.ToString()} BSV"; } );
    }
}