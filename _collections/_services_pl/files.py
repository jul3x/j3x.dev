# Define the input string
input_string = """
1.html
---
icon: cogs
title: Systemy dedykowane
descr: Tworzę unikalne rozwiązania dostosowane do specyficznych potrzeb Twojej firmy. Każdy system projektuję z myślą o maksymalnej efektywności i wydajności, aby w pełni wspierać procesy biznesowe.
---
2.html
---
icon: globe
title: Aplikacje webowe
descr: Specjalizuję się w tworzeniu nowoczesnych aplikacji webowych. Szczególną uwagę poświęcam intuicji rozwiązania oraz bezpieczeństwu. Aplikacje internetowe mojego autorstwa mogą wspomóc automatyzację procesów, poprawę komunikacji z klientami oraz zwiększenie produktywności.
---
3.html
---
icon: desktop
title: Strony internetowe
descr: Projektuję i wdrażam profesjonalne strony internetowe, które wyróżniają się atrakcyjnym designem i funkcjonalnością. Każda strona jest optymalizowana pod kątem SEO, aby przyciągać ruch i skutecznie prezentować Twoją ofertę w sieci.
---
4.html
---
icon: mobile-alt
title: Aplikacje mobilne
descr: Tworzę aplikacje mobilne na platformy Android oraz iOS. Moje aplikacje cechują się intuicyjnym interfejsem, wysoką wydajnością i bezpieczeństwem, dzięki czemu idealnie wspierają rozwój Twojego biznesu w świecie mobilnym.
---
5.html
---
icon: code
title: Skrypty i narzędzia
descr: Oferuję tworzenie skryptów i narzędzi automatyzujących codzienne zadania. Czerpiąc z doświadczenia w optymalizowaniu własnej pracy pomogę Ci usprawnić działanie Twojej firmy. Dzięki moim rozwiązaniom oszczędzisz czas i zredukujesz ryzyko błędów, aby skupić się na kluczowych aspektach biznesu.
---
6.html
---
icon: comments
title: Konsultacje IT
descr: Świadczę profesjonalne usługi konsultingowe w zakresie IT, pomagając w wyborze i implementacji najlepszych rozwiązań technologicznych oraz architektury. Moje doświadczenie pozwala na efektywne rozwiązanie problemów oraz optymalizację procesów IT w Twojej firmie.
---
7.html
---
icon: lightbulb
title: Nietypowe rozwiązania
descr: Podejmuję się realizacji nietypowych projektów, które wymagają innowacyjnego podejścia i kreatywności. Niezależnie od tego, jak złożone lub unikalne są Twoje wymagania, znajdę rozwiązanie, które spełni Twoje oczekiwania.
---
"""

# Split the input string into parts
parts = input_string.strip().split('---\n')

# Iterate over the parts and create files
for i in range(0, len(parts) - 1, 2):  # step by 2 to get pairs
    filename = parts[i].strip()
    content = '---\n' + parts[i + 1].strip() + '\n---'  # Construct the content
    
    # Write to the file
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(content.strip())

print("Files created successfully!")

