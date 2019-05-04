using System.Collections;
using UnityEditor;
using UnityEngine;

public class ModernUIEditor : EditorWindow {

	private static ModernUIEditor instance = null;

	[MenuItem("Tools/Modern UI Pack/Buttons/Basic")]
	static void CreateBasicButton()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Basic")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Basic Outline")]
	static void CreateBasicOutline()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Basic Outline")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Basic With Image")]
	static void CreateBasicWithImage()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Basic With Image")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Basic Outline With Image")]
	static void CreateBasicOutlineWithImage()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Basic Outline With Image")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Box Outline With Image")]
	static void CreateBoxOutlineWithImage()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Box Outline With Image")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Box With Image")]
	static void CreateBoxWithImage()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Box With Image")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Circle Outline With Image")]
	static void CreateCircleOutlineWithImage()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Circle Outline With Image")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Circle With Image")]
	static void CreateCircleWithImage()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Circle With Image")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Rounded")]
	static void RoundedButton()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Rounded Outline")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Buttons/Rounded Outline")]
	static void RoundedOutline()
	{
		Instantiate(Resources.Load<GameObject>("Buttons/Rounded Outline")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Notifications/Fading Notification")]
	static void FadingNotification()
	{
		Instantiate(Resources.Load<GameObject>("Notifications/Fading Notification")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Notifications/Popup Notification")]
	static void PopupNotification()
	{
		Instantiate(Resources.Load<GameObject>("Notifications/Popup Notification")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Notifications/Slippery Notification")]
	static void SlipperyNotification()
	{
		Instantiate(Resources.Load<GameObject>("Notifications/Slippery Notification")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Notifications/Slipping Notification")]
	static void SlippingNotification()
	{
		Instantiate(Resources.Load<GameObject>("Notifications/Slipping Notification")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars/Radial PB Bold")]
	static void RadialPBBold()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars/Radial PB Bold")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars/Radial PB Filled H")]
	static void RadialPBFilledH()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars/Radial PB Filled H")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars/Radial PB Filled V")]
	static void RadialPBFilledV()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars/Radial PB Filled V")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars/Radial PB Light")]
	static void RadialPBLight()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars/Radial PB Light")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars/Radial PB Regular")]
	static void RadialPBRegular()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars/Radial PB Regular")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars/Radial PB Thin")]
	static void RadialPBThin()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars/Radial PB Thin")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars/Standard PB")]
	static void StandardPB()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars/Standard PB")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars (Loop)/Circle Glass")]
	static void CircleGlass()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars (Loop)/Circle Glass")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars (Loop)/Circle Pie")]
	static void CirclePie()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars (Loop)/Circle Pie")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars (Loop)/Circle Run")]
	static void CircleRun()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars (Loop)/Circle Run")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars (Loop)/Circle Trapez")]
	static void CircleTrapez()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars (Loop)/Circle Trapez")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars (Loop)/Standard Fastly")]
	static void StandardFastly()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars (Loop)/Standard Fastly")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Progress Bars (Loop)/Standard Run")]
	static void StandardRun()
	{
		Instantiate(Resources.Load<GameObject>("Progress Bars (Loop)/Standard Run")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Sliders/Gradient")]
	static void GradientSlider()
	{
		Instantiate(Resources.Load<GameObject>("Sliders/Gradient")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Sliders/Outline")]
	static void OutlineSlider()
	{
		Instantiate(Resources.Load<GameObject>("Sliders/Outline")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Sliders/Standard")]
	static void StandardSlider()
	{
		Instantiate(Resources.Load<GameObject>("Sliders/Standard")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Switches/Outline")]
	static void OutlineSwitch()
	{
		Instantiate(Resources.Load<GameObject>("Switches/Outline")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Switches/Standard")]
	static void StandardSwitch()
	{
		Instantiate(Resources.Load<GameObject>("Switches/Standard")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Toggles/Standard (Bold)")]
	static void StandardToggleBold()
	{
		Instantiate(Resources.Load<GameObject>("Toggles/Standard Toggle (Bold)")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Toggles/Standard (Light)")]
	static void StandardToggleLight()
	{
		Instantiate(Resources.Load<GameObject>("Toggles/Standard Toggle (Light)")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Toggles/Standard (Regular)")]
	static void StandardToggleRegular()
	{
		Instantiate(Resources.Load<GameObject>("Toggles/Standard Toggle (Regular)")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Tool Tips/Fading")]
	static void FadingToolTip()
	{
		Instantiate(Resources.Load<GameObject>("Tool Tips/Fading Tool Tip")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Tool Tips/Scaling")]
	static void ScalingToolTip()
	{
		Instantiate(Resources.Load<GameObject>("Tool Tips/Scaling Tool Tip")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Dropdowns/Standard")]
	static void StandardDropdown()
	{
		Instantiate(Resources.Load<GameObject>("Dropdowns/Standard Dropdown")).GetComponent<ModernUIEditor>();
	}

	[MenuItem("Tools/Modern UI Pack/Dropdowns/Outline")]
	static void StandardDropdownOutline()
	{
		Instantiate(Resources.Load<GameObject>("Dropdowns/Outline Dropdown")).GetComponent<ModernUIEditor>();
	}

    [MenuItem("Tools/Modern UI Pack/Input Fields/Standard/Left Aligned")]
    static void StandardInputFieldLeft()
    {
        Instantiate(Resources.Load<GameObject>("Input Fields/Standard Input Field (Left Aligned)")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Input Fields/Standard/Middle Aligned")]
    static void StandardInputFieldMiddle()
    {
        Instantiate(Resources.Load<GameObject>("Input Fields/Standard Input Field (Middle Aligned)")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Input Fields/Standard/Right Aligned")]
    static void StandardInputFieldRight()
    {
        Instantiate(Resources.Load<GameObject>("Input Fields/Standard Input Field (Right Aligned)")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Sliders/Radial Standard")]
    static void StandardRadialSlider()
    {
        Instantiate(Resources.Load<GameObject>("Sliders/Radial Standard")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Sliders/Radial Gradient")]
    static void GradientRadialSlider()
    {
        Instantiate(Resources.Load<GameObject>("Sliders/Radial Gradient")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Modal Windows/Style 1/Only Exit Button")]
    static void OEBModal()
    {
        Instantiate(Resources.Load<GameObject>("Modal Windows/Style 1/Standard")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Modal Windows/Style 1/With Buttons")]
    static void WBModal()
    {
        Instantiate(Resources.Load<GameObject>("Modal Windows/Style 1/With Buttons")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Modal Windows/Style 1/With Tabs")]
    static void WTabModal()
    {
        Instantiate(Resources.Load<GameObject>("Modal Windows/Style 1/With Tabs")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Modal Windows/Style 1/Auto-Resizing")]
    static void ATRModal()
    {
        Instantiate(Resources.Load<GameObject>("Modal Windows/Style 1/Auto-Resizing")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Modal Windows/Style 2/Standard")]
    static void S2TSModal()
    {
        Instantiate(Resources.Load<GameObject>("Modal Windows/Style 2/Standard")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Modal Windows/Style 2/With Tabs")]
    static void ST2TModal()
    {
        Instantiate(Resources.Load<GameObject>("Modal Windows/Style 2/With Tabs")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Buttons/Rounded Outline With Image")]
    static void ROWIButton()
    {
        Instantiate(Resources.Load<GameObject>("Buttons/Rounded Outline With Image")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Buttons/Rounded With Image")]
    static void RWIButton()
    {
        Instantiate(Resources.Load<GameObject>("Buttons/Rounded With Image")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Animated Icons/Hamburger to Exit")]
    static void AIHTE()
    {
        Instantiate(Resources.Load<GameObject>("Animated Icons/Hamburger to Exit")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Animated Icons/Heart Pop")]
    static void AIHP()
    {
        Instantiate(Resources.Load<GameObject>("Animated Icons/Heart Pop")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Animated Icons/Message Bubbles")]
    static void AIMB()
    {
        Instantiate(Resources.Load<GameObject>("Animated Icons/Message Bubbles")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Animated Icons/Switch")]
    static void AISW()
    {
        Instantiate(Resources.Load<GameObject>("Animated Icons/Switch")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Animated Icons/Yes to No")]
    static void AIYTN()
    {
        Instantiate(Resources.Load<GameObject>("Animated Icons/Yes to No")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Animated Icons/Lock")]
    static void AILOCK()
    {
        Instantiate(Resources.Load<GameObject>("Animated Icons/Lock")).GetComponent<ModernUIEditor>();
    }

    [MenuItem("Tools/Modern UI Pack/Animated Icons/Sand Clock")]
    static void AISAND()
    {
        Instantiate(Resources.Load<GameObject>("Animated Icons/Sand Clock")).GetComponent<ModernUIEditor>();
    }

    public static void OnCustomWindow()
	{
		EditorWindow.GetWindow(typeof(ModernUIEditor));
	}
}
