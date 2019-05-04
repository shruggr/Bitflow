using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;

public class ModalDialog : MonoBehaviour {
	public static ModalDialog Instance;

	public UnityEvent CallbackOk;
	public Text ModalTitle;
	public Text ModalMessage;
	public GameObject ModalButton;
	public GameObject Container;
	public Animator Animator;

	void Awake() {
		Instance = this;
		Container.SetActive(false);
	}
	
	public void Show(string title, string message, bool confirmButton) {
		Container.SetActive(true);
		ModalTitle.text = title;
		ModalMessage.text = message;
		ModalButton.SetActive(confirmButton);
		Animator.Play("Fade-in");
	}

	public void Hide() {
		Container.SetActive(false);
		Animator.Play("Fade-out");
	}

	public void Confirm() {
		CallbackOk.Invoke();
		Hide();
	}
}
