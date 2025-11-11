<template>
  <section class="mt-16 sm:mt-24 lg:mt-32 scroll-mt-16" id="contact">
    <SectionHeader title="Contactez moi." />
    <div
      class="py-6 sm:py-8 lg:py-12 xl:py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl"
    >
      <div class="relative">
        <!-- Formulaire -->
        <form class="space-y-8" @submit.prevent="handleSubmit">
          <div
            v-if="notification.text"
            :class="[
              'rounded-lg p-4 border',
              notification.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800',
            ]"
          >
            {{ notification.text }}
          </div>
          <div v-for="(item, index) in inputs" :key="index">
            <Input
              :id="item.id"
              :label="item.label"
              :type="item.type"
              :placeholder="item.placeholder"
              :rows="item.rows"
              v-model="form[item.id]"
              :name="item.id"
            />
          </div>

          <!-- Container pour bouton et réseaux sociaux -->
          <div
            class="flex flex-col lg:flex-row justify-between items-center lg:items-end pt-6 gap-6 lg:gap-8"
          >
            <!-- Bouton Envoyer -->
            <div class="order-2 lg:order-1 w-[100px] sm:w-auto">
              <Button
                :text="loading ? 'Envoi…' : 'Envoyer'"
                variant="primary"
                size="md"
                type="submit"
                icon="<path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/>"
                :disabled="loading"
              />
            </div>

            <!-- Réseaux sociaux -->
            <div
              class="flex flex-col items-center lg:items-end order-1 lg:order-2 w-full lg:w-auto"
            >
              <h4
                class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4"
              ></h4>
              <div
                class="flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4"
              >
                <button
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  type="button"
                  @click.prevent="handleSocialClick(social.url)"
                  :title="social.name"
                  :class="[
                    'p-3 sm:p-3.5 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 transform cursor-pointer border-2 border-transparent hover:border-white/20 flex items-center justify-center min-w-[48px] min-h-[48px] sm:min-w-[52px] sm:min-h-[52px] touch-manipulation',
                    social.bgClass,
                    social.hoverClass,
                  ]"
                >
                  <svg
                    class="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    v-html="social.svg"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import SectionHeader from "../UI/SectionHeader.vue";
import Input from "../UI/Input.vue";
import Button from "../UI/Button.vue";
import { ref } from "vue";

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mjkjbqny";
const loading = ref(false);
const notification = ref({ type: "", text: "" });

const form = ref({
  email: "",
  object: "",
  message: "",
});

const handleSubmit = async () => {
  if (loading.value) return;
  notification.value = { type: "", text: "" };

  // Validation minimale
  if (
    !form.value.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
  ) {
    notification.value = {
      type: "error",
      text: "Veuillez saisir un email valide.",
    };
    return;
  }
  if (!form.value.object || !form.value.message) {
    notification.value = {
      type: "error",
      text: "Veuillez remplir l'objet et le message.",
    };
    return;
  }

  loading.value = true;
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: form.value.email,
        subject: form.value.object,
        message: form.value.message,
      }),
    });

    if (res.ok) {
      notification.value = {
        type: "success",
        text: "Votre message a été envoyé avec succès. Merci !",
      };
      form.value = { email: "", object: "", message: "" };
    } else {
      notification.value = {
        type: "error",
        text: "Une erreur s'est produite lors de l'envoi. Réessayez plus tard.",
      };
    }
  } catch (e) {
    notification.value = {
      type: "error",
      text: "Impossible de contacter le service d'envoi. Vérifiez votre connexion.",
    };
  } finally {
    loading.value = false;
  }
};

// Solution finale qui fonctionne dans tous les cas
const handleSocialClick = (url) => {
  if (url.startsWith("mailto:")) {
    // Méthode 1: Tentative d'ouverture directe
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);

    // Timeout pour détecter si ça n'a pas fonctionné
    const timeout = setTimeout(() => {
      // Fallback: Ouvrir Gmail avec les paramètres
      const email = "roseline.dako29@gmail.com";
      const subject = "Demande de collaboration";
      const body =
        "Bonjour Roseline, je vous contacte pour une conception graphique.";
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, "_blank");
    }, 1000);

    // Essayer d'ouvrir le client mail
    link.click();

    // Si ça marche, annuler le fallback
    window.addEventListener(
      "blur",
      () => {
        clearTimeout(timeout);
      },
      { once: true }
    );

    document.body.removeChild(link);
  } else {
    // Pour les autres réseaux sociaux
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

const inputs = ref([
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "email@example.com",
    rows: 1,
  },
  {
    id: "object",
    label: "Objet",
    type: "text",
    placeholder: "Quelle est la raison de votre message ?",
    rows: 3,
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Écrivez votre message",
    rows: 6,
  },
]);

const socialLinks = ref([
  {
    name: "Facebook",
    url: "https://www.facebook.com/roseline.dako.2025",
    bgClass: "bg-blue-600",
    hoverClass: "hover:bg-blue-700",
    svg: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/22941994468?text=Bonjour%20Roseline,%20je%20souhaite%20discuter%20d%27un%20projet%20avec%20vous.",
    bgClass: "bg-green-500",
    hoverClass: "hover:bg-green-600",
    svg: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>',
  },
  {
    name: "Tiktok",
    url: "https://vm.tiktok.com/ZMH3ea3JF99YE-1yZr3/",
    bgClass: "bg-black",
    hoverClass: "hover:bg-gray-800",
    svg: '<path fill="#FF0050" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/><path fill="#00F2EA" d="M15.9 2.44v.79a4.15 4.15 0 0 0 3.23 3.46v2.6a7.54 7.54 0 0 1-4.07-1.26v6.24a5.61 5.61 0 1 1-8.07-5.05v2.8a2.89 2.89 0 1 0 1.85 5.39c.43-.18.79-.49 1.06-.87a2.91 2.91 0 0 0 .41-1.49V2.44h5.59z"/>',
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/rosie_de_la_vella?igsh=MWpta2phZ2I5cHNnOA==",
    bgClass: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    hoverClass: "hover:scale-105",
    svg: '<path fill="white" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
  },
  {
    name: "Email",
    url: "mailto:roseline.dako29@gmail.com?subject=Demande de collaboration&body=Bonjour Roseline, je vous contacte pour la réalisation d'un projet.",
    bgClass: "bg-red-600",
    hoverClass: "hover:bg-red-700",
    svg: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  },
]);
</script>
