using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;

public class ModalDialog : MonoBehaviour {
	public static ModalDialog Instance;

	public UnityEvent CallbackYes;
	public UnityEvent CallbackNo;
	public Text ModalTitle;
	public Text ModalMessage;
	public GameObject NoButton;
    public Text NoButtonLabel;
	public GameObject YesButton;
    public Text YesButtonLabel;
    public GameObject Container;
    public GameObject Loading;
	public Animator Animator;

	void Awake() {
		Instance = this;
		Container.SetActive(false);
	}
	
	public void Show(string title, string message, string yesButton = "", string noButton = "") {
		Container.SetActive(true);
		ModalTitle.text = title;
		ModalMessage.text = message;
		YesButton.SetActive(!string.IsNullOrEmpty(yesButton));
	    YesButtonLabel.text = yesButton;
	    NoButton.SetActive(!string.IsNullOrEmpty(noButton));
	    NoButtonLabel.text = noButton;
        Loading.SetActive( string.IsNullOrEmpty( yesButton ) && string.IsNullOrEmpty( noButton ) );
        Animator.Play("Fade-in");
	}

	public void Hide() {
		Container.SetActive(false);
		Animator.Play("Fade-out");
	}

    public void OnYes()
    {
        CallbackYes.Invoke();
        Hide();
    }

    public void OnNo()
    {
        CallbackNo.Invoke();
        Hide();
    }

    public bool IsVisible()
    {
        return Container.activeSelf;
    }
}
