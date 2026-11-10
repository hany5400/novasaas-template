/**
 * NovaSaaS Template - Interactive Functions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Pricing Billing Toggle (Monthly / Annual)
  const billingToggle = document.getElementById('billingToggle');
  const starterPrice = document.getElementById('starterPrice');
  const proPrice = document.getElementById('proPrice');
  const enterprisePrice = document.getElementById('enterprisePrice');
  const billingPeriods = document.querySelectorAll('.billing-period');

  let isAnnual = false;

  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      const toggleDot = billingToggle.querySelector('div');
      
      if (isAnnual) {
        toggleDot.classList.add('translate-x-6');
        toggleDot.classList.remove('translate-x-1');
        billingToggle.classList.add('bg-indigo-600');
        billingToggle.classList.remove('bg-slate-750', 'bg-slate-700');
        
        // Annual Pricing (20% OFF discount applied)
        if (starterPrice) starterPrice.textContent = '$15';
        if (proPrice) proPrice.textContent = '$39';
        if (enterprisePrice) enterprisePrice.textContent = '$79';
        billingPeriods.forEach(el => el.textContent = '/month, billed annually');
      } else {
        toggleDot.classList.remove('translate-x-6');
        toggleDot.classList.add('translate-x-1');
        billingToggle.classList.remove('bg-indigo-600');
        billingToggle.classList.add('bg-slate-700');
        
        // Monthly Pricing
        if (starterPrice) starterPrice.textContent = '$19';
        if (proPrice) proPrice.textContent = '$49';
        if (enterprisePrice) enterprisePrice.textContent = '$99';
        billingPeriods.forEach(el => el.textContent = '/month');
      }
    });
  }

  // 3. Interactive Feature Tabs Demo
  const featureTabs = document.querySelectorAll('.feature-tab-btn');
  const demoScreens = document.querySelectorAll('.demo-screen');

  featureTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Update Tab Styles
      featureTabs.forEach(t => {
        t.classList.remove('bg-indigo-600/20', 'border-indigo-500/40', 'text-white');
        t.classList.add('bg-slate-900/40', 'border-white/5', 'text-slate-400');
      });
      tab.classList.remove('bg-slate-900/40', 'border-white/5', 'text-slate-400');
      tab.classList.add('bg-indigo-600/20', 'border-indigo-500/40', 'text-white');

      // Update Screen
      demoScreens.forEach(screen => {
        if (screen.id === targetId) {
          screen.classList.remove('hidden');
          screen.classList.add('block');
        } else {
          screen.classList.add('hidden');
          screen.classList.remove('block');
        }
      });
    });
  });

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        
        // Close all first for clean single-accordion behavior
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });

  // 5. Toast Notification for Forms / Action buttons
  const newsletterForm = document.getElementById('newsletterForm');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 3500);
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('🎉 Thank you for subscribing! Check your inbox soon.');
        emailInput.value = '';
      }
    });
  }

  // 6. Copy Code Button
  const copyBtn = document.getElementById('copyInstallBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeSnippet = document.getElementById('installCodeText')?.textContent || 'npx create-nova-app@latest';
      navigator.clipboard.writeText(codeSnippet.trim()).then(() => {
        showToast('📋 Copied command to clipboard!');
      });
    });
  }
});

