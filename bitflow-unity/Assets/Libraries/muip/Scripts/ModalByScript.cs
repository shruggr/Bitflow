using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ModalByScript : MonoBehaviour {
	public void DisplayModal() {
		ModalDialog.Instance.Show("Test", "Message", true);
	}
}
